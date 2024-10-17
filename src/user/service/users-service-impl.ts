import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from './contracts/users.service';
import { UserRepository } from 'src/database/repositories/contracts/user.repository';
import { PasswordEncoder } from './contracts/password-encoder.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserDto } from '../dto/user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from 'src/database/entities/user.entity';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class UsersServiceImpl extends UsersService {
  constructor(
    @Inject()
    private readonly userRepository: UserRepository,
    @Inject()
    private readonly passwordEncoder: PasswordEncoder,
  ) {
    super();
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserDto> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException('Usuario não encontrado');
    if (updateUserDto.email) {
      user.email = updateUserDto.email;
    }

    if (updateUserDto.password) {
      user.password = await this.passwordEncoder.encode(updateUserDto.password);
    }

    if (updateUserDto.name) {
      user.name = updateUserDto.name;
    }
    const updateUser = await this.userRepository.updateUser(id, user);
    return new UserDto(updateUser);
  }

  async createUser(dto: CreateUserDto): Promise<UserDto> {
    const user: User = UserMapper.toEntity(dto);
    user.password = await this.passwordEncoder.encode(dto.password);
    const userSaved = await this.userRepository.createUser(user);
    return new UserDto(userSaved);
  }

  async getAllUsers(): Promise<UserDto[]> {
    const users: User[] = await this.userRepository.findAll();

    return users.map((entity) => new UserDto(entity));
  }
}
