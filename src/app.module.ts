import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [DatabaseModule, UsersModule, VehicleModule, UserModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
