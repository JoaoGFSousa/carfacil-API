import { User } from 'src/database/entities/user.entity';

export abstract class UserRepository {
  abstract findByEmail(email: string): Promise<User>;
  abstract findById(id: number): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract createUser(user: User): Promise<User>;
  abstract updateUser(id: number, user: User): Promise<User>;
  abstract delete(id: number): Promise<void>;
}
