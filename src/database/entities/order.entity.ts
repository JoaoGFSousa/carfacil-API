import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { OrderItem } from './orderItem.entity';
import { BaseEntity } from './base-entity';

@Entity({ name: 'orders' })
export class Order extends BaseEntity {
  @Column()
  userId: number;

  @Column()
  totalPrice: number;

  @Column()
  paymentIntentId: string;

  @Column()
  paymentUrl: string;

  @Column()
  orderStatus: string;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToMany(() => OrderItem, (OrderItem) => OrderItem.order)
  orderItems: OrderItem[];
}
