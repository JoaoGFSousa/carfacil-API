import { Vehicle } from 'src/database/entities/vehicle.entity';

export class VehicleDto {
  id: number;
  user_id: number;
  category: string;
  ano: number;
  nome: string;
  marca: string;
  cor: string;
  cilindradas: number;
  combustivel: string;
  image: string;
  imageUrl: string;
  price: number;

  constructor(vehicle: Vehicle) {
    this.id = vehicle.id;
    this.user_id = vehicle.user.id;
    this.category = vehicle.category;
    this.ano = vehicle.ano;
    this.nome = vehicle.nome;
    this.marca = vehicle.marca;
    this.cor = vehicle.cor;
    this.cilindradas = vehicle.cilindradas;
    this.combustivel = vehicle.combustivel;
    this.image = vehicle.image;
    if (vehicle.image) {
      this.imageUrl = `http://127.0.0.1:3000/${vehicle.image.replace('public/', '')}`;
      this.price = vehicle.preco;
    }
  }
}
