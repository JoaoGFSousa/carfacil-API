import { Injectable } from '@nestjs/common';
import { VehicleRepository } from './contracts/vehicle.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from '../entities/vehicle.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VehicleRepositoryImpl extends VehicleRepository {
  constructor(
    @InjectRepository(Vehicle)
    private readonly repository: Repository<Vehicle>,
  ) {
    super();
  }
  async create(vehicle: Vehicle): Promise<Vehicle> {
    return this.repository.save(vehicle);
  }
  async update(id: number, vehicle: Vehicle): Promise<Vehicle> {
    await this.repository.update({ id }, vehicle);
    return this.findById(id);
  }
  findById(id: number): Promise<Vehicle | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['user'],
    });
  }
  async delete(id: number): Promise<void> {
    await this.repository.delete({ id });
  }
  findAll(): Promise<Vehicle[]> {
    return this.repository.find({
      relations: ['user'],
    });
  }
}
