import { JwtAdapter } from "../../../config";
import { RegisterUserDto } from "../../dto/auth/register-user-dto";
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories/auth.repository";


interface UserToken {
    token: string | null;
    user: {
        id: String;
        name: String;
        email: String
    }
}
type SignToken = (payload: Object, duration?: string) => Promise<string | null>;

interface RegisterUserUseCase {
    execute(registerUserDto: RegisterUserDto): Promise<UserToken>;
}


export class RegisteUser implements RegisterUserUseCase {

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly signToken: SignToken = JwtAdapter.generateToken
    ) { }
    async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {

        // crear el usuario 
        const user = await this.authRepository.register(registerUserDto);

        // retornar el token
        const token = await this.signToken({ id: user.id }, '2h');
        if (!token) throw CustomError.internalServerError('Error generation token');


        return {
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        };
    }
}