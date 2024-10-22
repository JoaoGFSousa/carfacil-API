import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './service/contract/auth.service';
import { AuthServiceImpl } from './service/auth.service.impl';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRATION,
      },
    }),
  ],
  providers: [
    JwtStrategy,
    {
      provide: AuthService,
      useClass: AuthServiceImpl,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
