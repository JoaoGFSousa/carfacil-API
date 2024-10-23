import { UserDto } from 'src/user/dto/user.dto';

export class AuthResponseDto {
  public readonly accessToken: string;
  public readonly type: string;
  public readonly user: UserDto;

  constructor(token: string, type: string, user: UserDto) {
    this.accessToken = token;
    this.type = type;
    this.user = user;
  }
}
