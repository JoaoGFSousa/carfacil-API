import { Vehicle } from 'src/database/entities/vehicle.entity';

export abstract class VehicleRepository {
  abstract create(vehicle: Vehicle): Promise<Vehicle>;
  abstract update(id: number, vehicle: Vehicle): Promise<Vehicle>;
  abstract findById(id: number): Promise<Vehicle | null>;
  abstract delete(id: number): Promise<void>;
  abstract findAll(): Promise<Vehicle[]>;
}
