import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from '../service/contracts/users.service';
import { UserDto } from '../dto/user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { JwtAuth } from 'src/shared/decorators/jwt.auth';

@Controller('/v1/users')
export class UsersControllers {
  constructor(
    @Inject()
    private readonly userService: UsersService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async getAll(): Promise<UserDto[]> {
    return this.userService.getAllUsers();
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @JwtAuth()
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    return this.userService.update(id, updateUserDto);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() body: CreateUserDto): Promise<UserDto> {
    return this.userService.createUser(body);
  }
}
