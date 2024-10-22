import { User } from 'src/database/entities/user.entity';
import { CreateVehicleDto } from 'src/vehicle/dto/create.vehicle.dto';
import { UpdateVehicleDto } from 'src/vehicle/dto/update.vehicle.dto';
import { VehicleDto } from 'src/vehicle/dto/vehicle.dto';

export abstract class VehicleService {
  abstract create(vehicle: CreateVehicleDto, user: User): Promise<VehicleDto>;
  abstract update(id: number, vehicle: UpdateVehicleDto): Promise<VehicleDto>;
  abstract delete(id: number): Promise<void>;
  abstract getAll(): Promise<VehicleDto[]>;
  abstract getById(id: number): Promise<VehicleDto>;
}
