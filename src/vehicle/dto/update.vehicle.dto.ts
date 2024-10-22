import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateVehicleDto {
  @IsString()
  @IsOptional()
  category: string;

  @IsNumber()
  @IsOptional()
  ano: number;

  @IsString()
  @IsOptional()
  nome: string;

  @IsString()
  @IsOptional()
  marca: string;

  @IsString()
  @IsOptional()
  cor: string;

  @IsNumber()
  @IsOptional()
  cilindradas: number;

  @IsString()
  @IsOptional()
  combustivel: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsString()
  @IsOptional()
  description: string;
}
