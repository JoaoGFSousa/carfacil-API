import { Injectable } from '@nestjs/common';
import { OrderItemRepository } from './contracts/orderItem.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from '../entities/orderItem.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderItemRepositoryImpl implements OrderItemRepository {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemrepository: Repository<OrderItem>,
  ) {}

  async create(orderItem: OrderItem): Promise<OrderItem> {
    return this.orderItemrepository.save(orderItem);
  }
  async update(id: number, orderItem: OrderItem): Promise<OrderItem> {
    await this.orderItemrepository.update({ id }, orderItem);
    return this.findById(id);
  }
  findById(id: number): Promise<OrderItem | null> {
    return this.orderItemrepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async delete(id: number): Promise<void> {
    await this.orderItemrepository.delete({ id });
  }

  findAll(): Promise<OrderItem[]> {
    return this.orderItemrepository.find({
      relations: ['user'],
    });
  }
}
