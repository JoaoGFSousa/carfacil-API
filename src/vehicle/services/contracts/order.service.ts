import { Order } from 'src/database/entities/order.entity';
import { User } from 'src/database/entities/user.entity';
import { CreateOrderDto } from 'src/vehicle/dto/create.order.dto';
import { PaymentDto } from 'src/vehicle/dto/payment.dto';

export abstract class OrderService {
  abstract createOrder(dto: CreateOrderDto, user: User): Promise<Order>;
  abstract deleteOrder(id: number): Promise<void>;
  abstract getById(id: number): Promise<Order>;
  abstract payment(id: number): Promise<PaymentDto>;
}
