import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

export const JwtAuth = () => UseGuards(JwtGuard);
