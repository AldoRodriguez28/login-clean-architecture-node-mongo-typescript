import { Validators } from "../../../config";

export class LoginUserDto {
    private constructor(
        public email: string,
        public password: string,
    ) { }

    static login(object: { [key: string]: any }): [string | null, LoginUserDto?] {
        const { email, password } = object;
        if (!email) return ['Missing email'];
        if (!Validators.email.test(email)) return ['Email is not valid'];
        if (!password) return ['Missing password'];
        if (password < 6) return ['password is too short'];



        return [null, new LoginUserDto(email, password)];
    }
}