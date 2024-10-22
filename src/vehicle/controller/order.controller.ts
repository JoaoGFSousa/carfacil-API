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
import { VehicleMapper } from '../mapper/vehicle.mapper';

@Controller('/v1/order')
export class OrderController {
  constructor(@Inject() private readonly orderService: OrderService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @JwtAuth()
  @BodyValidated()
  async createOrder(@Req() { user }: any, @Body() dto: CreateOrderDto) {
    const order = await this.orderService.createOrder(dto, user);
    return VehicleMapper.toOutDto(order);
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
  async getById(@Param('id') id: number) {
    const order = await this.orderService.getById(id);
    return VehicleMapper.toOutDto(order);
  }
}
