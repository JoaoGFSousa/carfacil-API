import { Module } from '@nestjs/common';
import { VehicleService } from './services/contracts/vehicle.service';
import { VehiclesController } from './controller/vehicles.controller';
import { VehicleServiceImpl } from './services/vehicle.service.impl';
import { FileUploadServiceImpl } from './services/file.upload.service.impl';
import { FileUploadService } from './services/contracts/file.upload.service';
import { OrderService } from './services/contracts/order.service';
import { OrderServiceImpl } from './services/order.service.impl';

@Module({
  providers: [
    {
      provide: VehicleService,
      useClass: VehicleServiceImpl,
    },
    {
      provide: FileUploadService,
      useClass: FileUploadServiceImpl,
    },
    {
      provide: OrderService,
      useClass: OrderServiceImpl,
    },
  ],
  controllers: [VehiclesController],
})
export class VehicleModule {}
