import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Vehicle } from './entities/vehicle.entity';
import { VehicleRepository } from './repositories/contracts/vehicle.repository';
import { VehicleRepositoryImpl } from './repositories/vehicle.repository.impl';
import { UserRepository } from './repositories/contracts/user.repository';
import { UserRepositoryImpl } from './repositories/user.repository.impl';
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_DRIVER as any,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname.concat('/entities/*.entity{.ts,.js}')],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Vehicle]),
  ],
  providers: [
    {
      provide: VehicleRepository,
      useClass: VehicleRepositoryImpl,
    },
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl,
    },
  ],
})
export class DatabaseModule {}
