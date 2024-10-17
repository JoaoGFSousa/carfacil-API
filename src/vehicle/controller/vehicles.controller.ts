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
  Put,
  Req,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { VehicleService } from '../services/contracts/vehicle.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateVehicleDto } from '../dto/create.vehicle.dto';
import { randomUUID } from 'crypto';
import { UpdateVehicleDto } from '../dto/update.vehicle.dto';
import { Arr } from 'src/shared/utils/arr';
import { JwtAuth } from 'src/shared/decorators/jwt.auth';
import { BodyValidated } from 'src/shared/decorators/body.validated';

@Controller('/v1/vehicles')
export class VehiclesController {
  uploadFileService: any;
  constructor(@Inject() private readonly vehicleService: VehicleService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.vehicleService.getAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @JwtAuth()
  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'image',
        maxCount: 1,
      },
    ]),
  )
  async create(
    @Req() { user }: any,
    @Body() dto: CreateVehicleDto,
    @UploadedFiles() file: { image?: any[] },
  ) {
    const { image } = file ?? {};
    dto.user = user;
    if (image) {
      dto.image = await this.uploadFileService.uploadFileFromBuffer(
        image[0].buffer,
        ['public', 'storage', 'products', user.id],
        `${randomUUID()}.${Arr.last(image[0].originalname.split('.'))}`,
      );
    }
    return this.vehicleService.create(dto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @JwtAuth()
  @BodyValidated()
  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'image',
        maxCount: 1,
      },
    ]),
  )
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateVehicleDto,
    @UploadedFiles() file: { image?: any[] },
    @Req() { user }: any,
  ) {
    const { image } = file ?? {};

    if (dto.image && typeof dto.image === 'string') {
      dto.image = await this.uploadFileService.uploadFileFromBuffer(
        image[0].buffer,
        ['public', 'storage', 'products', user.id],
        `${randomUUID()}.${Arr.last(image[0].originalname.split('.'))}`,
      );
    }
    return this.vehicleService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @JwtAuth()
  delete(@Param('id') id: number) {
    return this.vehicleService.delete(id);
  }
}
