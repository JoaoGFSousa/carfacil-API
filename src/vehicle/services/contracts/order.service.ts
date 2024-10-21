import { Order } from 'src/database/entities/order.entity';
import { User } from 'src/database/entities/user.entity';
import { CreateOrderDto } from 'src/vehicle/dto/create.order.dto';

export abstract class OrderService {
  abstract createOrder(dto: CreateOrderDto, user: User): Promise<Order>;
  abstract deleteOrder(id: number): Promise<void>;
  abstract getById(id: number): Promise<Order>;
}
