import { applyDecorators, UsePipes, ValidationPipe } from '@nestjs/common';

export const BodyValidated = () =>
  applyDecorators(UsePipes(new ValidationPipe()));
