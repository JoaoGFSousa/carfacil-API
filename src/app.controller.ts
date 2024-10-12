import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
@Controller()
export class AppController {
  constructor() {}

  @Get('/health')
  getHello(@Res() res: Response): Response {
    return res.status(200).json({
      status: 200,
      message: 'api is running',
    });
  }
}
