import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, VehicleModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
