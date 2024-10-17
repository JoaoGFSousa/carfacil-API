import { Vehicle } from 'src/database/entities/vehicle.entity';
import { CreateVehicleDto } from '../dto/create.vehicle.dto';
import { UpdateVehicleDto } from '../dto/update.vehicle.dto';

export class VehicleMapper {
  public static createEntity(dto: CreateVehicleDto): Vehicle {
    const vehicle = new Vehicle();
    vehicle.category = dto.category;
    vehicle.ano = dto.ano;
    vehicle.nome = dto.nome;
    vehicle.marca = dto.marca;
    vehicle.cor = dto.cor;
    vehicle.cilindradas = dto.cilindradas;
    vehicle.combustivel = dto.combustivel;
    vehicle.image = dto.image;
    vehicle.price = dto.price;
    return vehicle;
  }

  public static updateEntity(dto: UpdateVehicleDto): Vehicle {
    const vehicle = new Vehicle();
    vehicle.category = dto.category;
    vehicle.ano = dto.ano;
    vehicle.nome = dto.nome;
    vehicle.marca = dto.marca;
    vehicle.cor = dto.cor;
    vehicle.cilindradas = dto.cilindradas;
    vehicle.combustivel = dto.combustivel;
    vehicle.image = dto.image;
    vehicle.price = dto.price;
    return vehicle;
  }
}
