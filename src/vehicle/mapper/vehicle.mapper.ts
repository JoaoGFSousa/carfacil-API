import { Vehicle } from 'src/database/entities/vehicle.entity';
import { CreateVehicleDto } from '../dto/create.vehicle.dto';
import { UpdateVehicleDto } from '../dto/update.vehicle.dto';
import { Order } from 'src/database/entities/order.entity';
import { OrderDto } from '../dto/order.dto';
import { OrderItemDto } from '../dto/orderItem.dto';
import { UserDto } from 'src/user/dto/user.dto';

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
    vehicle.preco = dto.price;
    vehicle.description = dto.description;
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
    vehicle.preco = dto.price;
    vehicle.description = dto.description;
    return vehicle;
  }
  public static toOutDto(order: Order): OrderDto {
    const orderDto = new OrderDto();
    orderDto.id = order.id;
    orderDto.totalPrice = order.totalPrice;
    orderDto.paymentIntentId = order.paymentIntentId;
    orderDto.paymentUrl = order.paymentUrl;
    orderDto.orderStatus = order.orderStatus;
    orderDto.orderItems = order.orderItems.map((item) => {
      const orderItemDto = new OrderItemDto();
      orderItemDto.unitPrice = item.unitPrice;
      orderItemDto.quantity = item.quantity;
      orderItemDto.vehicleId = item.vehicle.id;
      return orderItemDto;
    });
    orderDto.user = new UserDto(order.user);
    return orderDto;
  }
}
