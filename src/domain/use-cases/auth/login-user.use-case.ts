import { JwtAdapter } from "../../../config";
import { LoginUserDto } from "../../dto/auth/login-user-dto";
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

interface LoginUserUseCase {
    execute(loginUserDto: LoginUserDto): Promise<UserToken>;
}


export class LoginUser implements LoginUserUseCase {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly signToken: SignToken = JwtAdapter.generateToken

    ) { }

    async execute(loginUserDto: LoginUserDto): Promise<UserToken> {

        const loginUser = await this.authRepository.login(loginUserDto)

        const token = await this.signToken({ id: loginUser.id }, '2h');
        if (!token) throw CustomError.internalServerError('Error generation token');


        return {
            token: token,
            user: {
                id: loginUser.id,
                name: loginUser.name,
                email: loginUser.email
            }
        };
    }
}