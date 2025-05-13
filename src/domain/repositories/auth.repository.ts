import { LoginUserDto } from "../dto/auth/login-user-dto";
import { RegisterUserDto } from "../dto/auth/register-user-dto";
import { UserEntity } from "../entities/user.entity";

export abstract class AuthRepository {

    //todo:
    // abstract login
    abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>

    abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>
}