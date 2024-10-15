import { BaseEntity, Column, Entity, OneToMany } from 'typeorm';
import { Vehicle } from './vehicle.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Vehicle, (Vehicle) => Vehicle.user)
  vehicles: Vehicle[];
}
