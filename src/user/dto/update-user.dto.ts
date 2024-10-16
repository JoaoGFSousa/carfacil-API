import { IsEmail, IsOptional, IsStrongPassword, Length } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @Length(8, 20)
  password: string;
}
