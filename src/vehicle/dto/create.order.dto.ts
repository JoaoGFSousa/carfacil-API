import { IsNotEmpty } from 'class-validator';
import { CreateOrderItemDto } from './create.orderItem.dto';

export class CreateOrderDto {
  @IsNotEmpty()
  vehicles: CreateOrderItemDto[];
}
