import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderService } from './contracts/order.service';
import { OrderRepository } from 'src/database/repositories/contracts/order.repository';
import { CreateOrderDto } from '../dto/create.order.dto';
import { Order } from 'src/database/entities/order.entity';
import { OrderItem } from 'src/database/entities/orderItem.entity';
import { VehicleRepository } from 'src/database/repositories/contracts/vehicle.repository';
import { User } from 'src/database/entities/user.entity';
import Stripe from 'stripe';
import { PaymentDto } from '../dto/payment.dto';

@Injectable()
export class OrderServiceImpl implements OrderService {
  private stripe: Stripe;
  constructor(
    private readonly vehicleRepository: VehicleRepository,
    private readonly orderRepository: OrderRepository,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2020-08-27',
    });
  }

  async createOrder(dto: CreateOrderDto, user: User): Promise<Order> {
    const orderItems: OrderItem[] = [];
    const order = new Order();
    order.user = user;
    order.orderStatus = 'pending';
    const totalPrices = await Promise.all(
      dto.vehicles.map(async (vehicleOrder) => {
        const vehicle = await this.vehicleRepository.findById(
          vehicleOrder.vehicleId,
        );
        const orderItem = new OrderItem();
        orderItem.vehicle = vehicle;
        orderItem.quantity = vehicleOrder.amount;
        orderItem.unitPrice = vehicle.preco;
        orderItem.order = order;
        orderItems.push(orderItem);
        return vehicle.preco * vehicleOrder.amount;
      }),
    );
    const totalPrice = totalPrices.reduce((acc, value) => acc + value, 0);
    order.totalPrice = totalPrice;
    order.orderItems = orderItems;
    return this.orderRepository.create(order);
  }

  async getById(id: number): Promise<Order> {
    const order = await this.orderRepository.findById(id);

    if (!order) throw new NotFoundException('Order não encontrado');

    return order;
  }

  async deleteOrder(id: number): Promise<void> {
    await this.getById(id);
    await this.orderRepository.delete(id);
  }

  async payment(id: number): Promise<PaymentDto> {
    const order = await this.getById(id);
    const session = await this.stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: order.orderItems.map((orderItem) => {
        return {
          price_data: {
            currency: 'brl',
            product_data: {
              name: orderItem.vehicle.nome,
            },
            unit_amount: orderItem.vehicle.preco,
          },
          quantity: orderItem.quantity,
        };
      }),
      success_url: 'http://localhost:3001/payment/success',
      cancel_url: 'http://localhost:3001/payment/cancel',
    });
    order.paymentIntentId = session.id;
    order.paymentUrl = session.url;
    this.orderRepository.update(order.id, order);
    const paymentDto = new PaymentDto();
    paymentDto.payment_url = session.url;
    return paymentDto;
  }
}
