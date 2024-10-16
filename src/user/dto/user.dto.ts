import { User } from 'src/database/entities/user.entity';

export class UserDto {
  id: number;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;

  constructor(user?: User) {
    if (!user) return;
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.created_at = user.createAt;
    this.updated_at = user.updatedAt;
  }
}
