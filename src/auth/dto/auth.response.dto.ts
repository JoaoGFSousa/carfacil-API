export class AuthResponseDto {
  public readonly token: string;
  public readonly type: string;

  constructor(token: string, type: string) {
    this.token = token;
    this.type = type;
  }
}
