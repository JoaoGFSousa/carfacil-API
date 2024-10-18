import { Order } from 'src/database/entities/order.entity';

export abstract class OrderRepository {
  abstract create(order: Order): Promise<Order>;
  abstract update(id: number, order: Order): Promise<Order>;
  abstract findById(id: number): Promise<Order | null>;
  abstract delete(id: number): Promise<void>;
  abstract findAll(): Promise<Order[]>;
}
