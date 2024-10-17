import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { AuthService } from '../service/contract/auth.service';
import { BodyValidated } from 'src/shared/decorators/body.validated';
import { AuthRequestDto } from '../dto/auth.request.dto';

@Controller('/v1/auth')
export class AuthController {
  constructor(
    @Inject()
    private readonly authService: AuthService,
  ) {}

  @Post()
  @BodyValidated()
  @HttpCode(HttpStatus.CREATED)
  async auth(@Body() auth: AuthRequestDto) {
    return this.authService.login(auth);
  }
}
