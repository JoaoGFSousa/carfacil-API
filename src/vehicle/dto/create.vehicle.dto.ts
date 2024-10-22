import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVehicleDto {
  user?: any;
  @IsString()
  @IsNotEmpty()
  category: string;

  @IsNumber()
  @IsNotEmpty()
  ano: number;

  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  marca: string;

  @IsString()
  @IsNotEmpty()
  cor: string;

  @IsNumber()
  @IsNotEmpty()
  cilindradas: number;

  @IsString()
  @IsNotEmpty()
  combustivel: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;
}
