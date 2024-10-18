import { BaseEntity, Column, Entity, ManyToOne } from 'typeorm';
import { Order } from './order.entity';
import { Vehicle } from './vehicle.entity';

@Entity({ name: 'order_Items' })
export class OrderItem extends BaseEntity {
  @Column()
  id: number;

  @Column()
  orderId: number;

  @Column()
  productId: number;

  @Column()
  unitPrice: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Order, (order) => order.orderItems)
  @Column()
  order: Order;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.orderItems)
  @Column()
  vehicle: Vehicle;
}
