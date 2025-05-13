import { unsubscribe } from 'diagnostics_channel';
import { UserModel } from '../../data/mongoDB'
import { AuthDataSource, CustomError, RegisterUserDto, UserEntity } from "../../domain";
import { LoginUserDto } from "../../domain/dto/auth/login-user-dto";
import { BcryptAdapter } from '../../config';
import { UserMapper } from '../mappers/user.mapper';




type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;



export class AuthDataSourceImpl implements AuthDataSource {
    constructor(
        private readonly hashPassword: HashFunction = BcryptAdapter.hash,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare

    ) { }
    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        const { email, password } = loginUserDto;
        try {
            // 1. verificar si el correo existe 
            const userByEmail = await UserModel.findOne({ email: email });
            if (!userByEmail) throw CustomError.badRequest('User Don´t exists');

            //2. verificar y comparar contraseñas
            const isMatching = this.comparePassword(password, userByEmail.password);
            if (!isMatching) throw CustomError.badRequest('Password wrong');

            // 3. Mappear la respuesta a nuestra entidad
            return UserMapper.useEntityFromObject(userByEmail);
        } catch (error) {
            if (error instanceof CustomError) { throw error; }
            throw CustomError.internalServerError("Internal server Error");
        }

    }
    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        const { name, email, password, role, img } = registerUserDto;

        try {
            // 1. verificar si el correo existe 
            const isEmail = await UserModel.findOne({ email: email });
            if (isEmail) throw CustomError.badRequest('User already exists');

            // 2. Hash de contraseña
            const user = await UserModel.create({
                name: name,
                email: email,
                password: this.hashPassword(password),
                role: role,
                img: img
            });

            await user.save();
            // 3. Mappear la respuesta a nuestra entidad
            return UserMapper.useEntityFromObject(user);
        } catch (error) {
            if (error instanceof CustomError) { throw error; }
            throw CustomError.internalServerError("Internal server Error");
        }

    }

}