import { AuthRequestDto } from 'src/auth/dto/auth.request.dto';
import { AuthResponseDto } from 'src/auth/dto/auth.response.dto';
import { User } from 'src/database/entities/user.entity';

export abstract class AuthService {
  abstract login(auth: AuthRequestDto): Promise<AuthResponseDto>;
  abstract signToken(user: User): Promise<string>;
  abstract validateUser(email: string): Promise<User>;
}
