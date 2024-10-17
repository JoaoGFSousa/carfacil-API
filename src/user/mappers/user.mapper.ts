import { User } from 'src/database/entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

export class UserMapper {
  public static toEntity(dto: CreateUserDto): User {
    const user = new User();
    user.email = dto.email;
    user.password = dto.password;
    user.name = dto.name;
    return user;
  }
}
