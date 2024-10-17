import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './contract/auth.service';
import { UserRepository } from 'src/database/repositories/contracts/user.repository';
import { AuthResponseDto } from '../dto/auth.response.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/database/entities/user.entity';
import { randomUUID } from 'crypto';
import { PasswordEncoder } from 'src/user/service/contracts/password-encoder.service';
import { AuthRequestDto } from '../dto/auth.request.dto';

@Injectable()
export class AuthServiceImpl extends AuthService {
  constructor(
    @Inject()
    private readonly passwordEncoder: PasswordEncoder,
    @Inject()
    private readonly userRepository: UserRepository,
    @Inject()
    private readonly jwtService: JwtService,
  ) {
    super();
  }

  async login(auth: AuthRequestDto): Promise<AuthResponseDto> {
    const user = await this.userRepository.findByEmail(auth.email);
    if (!user) throw new UnauthorizedException('Usuário ou senha inválidos');
    const passwordMatches = await this.passwordEncoder.matches(
      auth.password,
      user.password,
    );

    if (!passwordMatches)
      throw new UnauthorizedException('Usúario ou senha inválidos');
    const token = await this.signToken(user);

    return new AuthResponseDto(token, 'Bearer');
  }
  async signToken(user: User): Promise<string> {
    return this.jwtService.signAsync(
      {
        sub: user.id,
        user: {
          name: user.name,
          email: user.email,
        },
        jti: randomUUID(),
      },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRATION,
      },
    );
  }

  async validateUser(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new UnauthorizedException('Usuário não autorizado');

    return user;
  }
}
