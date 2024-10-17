import { Global, Module } from '@nestjs/common';
import { UsersService } from './service/contracts/users.service';
import { UsersServiceImpl } from './service/users-service-impl';
import { PasswordEncoder } from './service/contracts/password-encoder.service';
import { PasswordEncoderImpl } from './service/password-encoder.service';
import { UsersControllers } from './controllers/users.controller';
@Global()
@Module({
  providers: [
    {
      provide: UsersService,
      useClass: UsersServiceImpl,
    },
    {
      provide: PasswordEncoder,
      useClass: PasswordEncoderImpl,
    },
  ],
  controllers: [UsersControllers],
  exports: [PasswordEncoder],
})
export class UserModule {}
