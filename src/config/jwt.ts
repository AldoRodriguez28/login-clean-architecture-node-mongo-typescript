import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { StringValue } from 'ms';
import { envs } from './envs';


const JWT_SECRET = envs.JWT_SECRET;

export class JwtAdapter {

    static async generateToken(
        payload: string | object | Buffer,
        duration: string = '2h',
    ): Promise<string | null> {
        const secret: Secret = JWT_SECRET;
        const options: SignOptions = { expiresIn: duration as StringValue };


        return new Promise((resolve) => {
            //Todo de la generacion del SEED
            jwt.sign(payload, secret, options, (err, token) => {
                if (err) return resolve(null);
                resolve(token!);
            });
        })

    }

    static validateToken<T>(token: string): Promise<T | null> {
        return new Promise((resolve) => {
            jwt.verify(token, JWT_SECRET, (err, decoded) => {
                if (err) return resolve(null);

                resolve(decoded as T);

            })

        })
    }
}