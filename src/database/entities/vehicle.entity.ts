import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base-entity';
import { User } from './user.entity';

@Entity({ name: 'vehicles' })
export class Vehicle extends BaseEntity {
  @Column()
  category: string;
  '';
  @Column()
  ano: number;

  @Column()
  nome: string;

  @Column()
  marca: string;

  @Column()
  cor: string;

  @Column('decimal', { precision: 10, scale: 2 })
  cilindradas: number;

  @Column()
  combustivel: string;

  @Column()
  img: string;

  @ManyToOne(() => User, (user) => user.vehicles)
  @JoinColumn()
  user: User;
}
