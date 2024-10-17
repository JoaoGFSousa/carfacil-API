import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { VehicleService } from './contracts/vehicle.service';
import { VehicleRepository } from 'src/database/repositories/contracts/vehicle.repository';
import { CreateVehicleDto } from '../dto/create.vehicle.dto';
import { VehicleDto } from '../dto/vehicle.dto';
import { VehicleMapper } from '../mapper/vehicle.mapper';
import { UpdateVehicleDto } from '../dto/update.vehicle.dto';
import { unlink } from 'node:fs/promises';

@Injectable()
export class VehicleServiceImpl extends VehicleService {
  constructor(
    @Inject()
    private readonly vehicleRepository: VehicleRepository,
  ) {
    super();
  }

  async create(vehicle: CreateVehicleDto): Promise<VehicleDto> {
    const vehicleSaved = await this.vehicleRepository.create(
      VehicleMapper.createEntity(vehicle),
    );
    return new VehicleDto(vehicleSaved);
  }

  async update(id: number, dto: UpdateVehicleDto): Promise<VehicleDto> {
    const vehicle = await this.getById(id);

    if (dto.image && vehicle.image) {
      try {
        await unlink(vehicle.image);
      } catch (e: any) {
        console.log('erro', e);
      }
    }

    const vehicleUpated = await this.vehicleRepository.update(
      id,
      VehicleMapper.updateEntity(dto),
    );
    return new VehicleDto(vehicleUpated);
  }

  async getById(id: number): Promise<VehicleDto> {
    const vehicle = await this.vehicleRepository.findById(id);

    if (!vehicle) throw new NotFoundException('Produto não encontrado');

    return new VehicleDto(vehicle);
  }

  async getAll(): Promise<VehicleDto[]> {
    const vehicles = await this.vehicleRepository.findAll();

    return vehicles.map((vehicle) => new VehicleDto(vehicle));
  }

  async delete(id: number): Promise<void> {
    await this.getById(id);
    await this.vehicleRepository.delete(id);
  }
}
