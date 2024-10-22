import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { OrderRepository } from './contracts/order.repository';

@Injectable()
export class OrderRepositoryImpl extends OrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {
    super();
  }
  async create(order: Order): Promise<Order> {
    return this.orderRepository.save(order);
  }
  async update(id: number, order: Order): Promise<Order> {
    await this.orderRepository.update({ id }, order);
    return this.findById(id);
  }
  findById(id: number): Promise<Order | null> {
    return this.orderRepository.findOne({
      where: { id },
      relations: ['user', 'orderItems', 'orderItems.vehicle'],
    });
  }

  async delete(id: number): Promise<void> {
    await this.orderRepository.delete({ id });
  }

  findAll(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: ['user'],
    });
  }
}
