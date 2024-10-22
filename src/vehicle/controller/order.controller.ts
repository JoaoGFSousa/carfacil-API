import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { OrderService } from '../services/contracts/order.service';
import { JwtAuth } from 'src/shared/decorators/jwt.auth';
import { BodyValidated } from 'src/shared/decorators/body.validated';
import { CreateOrderDto } from '../dto/create.order.dto';

@Controller('/v1/order')
export class OrderController {
  constructor(@Inject() private readonly orderService: OrderService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @JwtAuth()
  @BodyValidated()
  async createOrder(@Req() { user }: any, @Body() dto: CreateOrderDto) {
    return this.orderService.createOrder(dto, user);
  }

  @Post(':id/payment')
  @HttpCode(HttpStatus.OK)
  @JwtAuth()
  @BodyValidated()
  async createPayment(@Param('id') id: number) {
    return this.orderService.payment(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @JwtAuth()
  delete(@Param('id') id: number) {
    return this.orderService.deleteOrder(id);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getById(@Param('id') id: number) {
    return this.orderService.getById(id);
  }
}
