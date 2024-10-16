import { CreateUserDto } from "src/user/dto/create-user.dto";
import { UpdateUserDto } from "src/user/dto/update-user.dto";
import { UserDto } from "src/user/dto/user.dto";

export abstract class UsersService{
    abstract update(id: number, updateUserDto:UpdateUserDto): Promise<UserDto>;
    abstract createUser(dto: CreateUserDto): Promise<UserDto>;
    abstract getAllUsers(): Promise<UserDto[]>;
}