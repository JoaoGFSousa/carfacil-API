import { Injectable } from '@nestjs/common';
import { UserRepository } from './contracts/user.repository';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}
  findByEmail(email: string): Promise<User> {
    return this.repository.findOneBy({ email });
  }
  findById(id: number): Promise<User> {
    return this.repository.findOneBy({ id });
  }
  findAll(): Promise<User[]> {
    return this.repository.find();
  }
  createUser(user: User): Promise<User> {
    return this.repository.save(user);
  }
  async updateUser(id: number, user: User): Promise<User> {
    await this.repository.update({ id }, user);
    const result = await this.findById(id);
    return result;
  }
  async delete(id: number): Promise<void> {
    await this.repository.delete({ id });
  }
}
