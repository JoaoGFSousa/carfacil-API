import { Module } from '@nestjs/common';
import { VehicleService } from './services/contracts/vehicle.service';
import { VehiclesController } from './controller/vehicles.controller';
import { VehicleServiceImpl } from './services/vehicle.service.impl';

@Module({
  providers: [
    {
      provide: VehicleService,
      useClass: VehicleServiceImpl,
    },
  ],
  controllers: [VehiclesController],
})
export class VehicleModule {}
