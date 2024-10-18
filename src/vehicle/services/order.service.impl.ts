import { Injectable } from '@nestjs/common';
import { OrderService } from './contracts/order.service';
import { OrderRepository } from 'src/database/repositories/contracts/order.repository';
import { CreateOrderDto } from '../dto/create.order.dto';
import { Order } from 'src/database/entities/order.entity';
import { OrderItem } from 'src/database/entities/orderItem.entity';
import { VehicleRepository } from 'src/database/repositories/contracts/vehicle.repository';
import { User } from 'src/database/entities/user.entity';

@Injectable()
export class OrderServiceImpl implements OrderService {
  constructor(
    private readonly vehicleRepository: VehicleRepository,
    private readonly orderRepository: OrderRepository,
  ) {}

  async createOrder(dto: CreateOrderDto, user: User): Promise<Order> {
    const orderItems: OrderItem[] = [];
    const order = new Order();
    order.user = user;

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
}
