import { UserDto } from 'src/user/dto/user.dto';
import { OrderItemDto } from './orderItem.dto';

export class OrderDto {
  id: number;
  totalPrice: number;
  paymentIntentId: string;
  paymentUrl: string;
  orderStatus: string;
  orderItems: OrderItemDto[];
  user: UserDto;
}
