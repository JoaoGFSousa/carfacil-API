import { Column, Entity, OneToMany } from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { BaseEntity } from './base-entity';
import { Order } from './order.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.user)
  vehicles: Vehicle[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
