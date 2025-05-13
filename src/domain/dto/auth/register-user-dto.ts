import { Validators } from '../../../config'

export class RegisterUserDto{
    private constructor(
        public name:string,
        public email:string,
        public password:string,
        public role:string[],
        public img?:string, 
    ){}
                                                   
    static create(object: { [key: string]: any }): [string | null, RegisterUserDto?] {

         const {name, email, password, role, img} = object;

         if(!name) return ['Missing name'];
         if(!email) return ['Missing email'];
         if(!Validators.email.test(email)) return ['Email is not valid'];
         if(!password) return ['Missing password'];
         if(password < 6) return ['password is too short'];
         if(!role) return ['Missing role'];
         if(!img) return ['Missing img'];

         return [null, new RegisterUserDto(name, email, password, role, img)];

    }
}