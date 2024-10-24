import { Column, Entity, ManyToOne } from 'typeorm';
import { Order } from './order.entity';
import { Vehicle } from './vehicle.entity';
import { BaseEntity } from './base-entity';

@Entity({ name: 'order_Items' })
export class OrderItem extends BaseEntity {
  @Column()
  id: number;

  @Column({ type: 'float' })
  unitPrice: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.orderItems)
  vehicle: Vehicle;
}
