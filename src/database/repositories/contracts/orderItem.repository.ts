import { OrderItem } from 'src/database/entities/orderItem.entity';

export abstract class OrderItemRepository {
  abstract create(orderItem: OrderItem): Promise<OrderItem>;
  abstract update(id: number, orderItem: OrderItem): Promise<OrderItem>;
  abstract findById(id: number): Promise<OrderItem | null>;
  abstract delete(id: number): Promise<void>;
  abstract findAll(): Promise<OrderItem[]>;
}
