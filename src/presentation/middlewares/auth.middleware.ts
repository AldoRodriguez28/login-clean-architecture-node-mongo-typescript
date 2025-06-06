import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongoDB";

export class AuthMiddlewar {
    static validateJWT = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const authtorization = req.header('Authorization');
        if (!authtorization) {
            res.status(401).json({ error: 'No token provided' });
            return;
        }
        if (!authtorization.startsWith('Bearer ')) {
            res.status(401).json({ error: 'Invalid Bearer token' });
            return;
        }

        const token = authtorization.split(' ').at(1) || '';


        try {
            //TODO
            const payload = await JwtAdapter.validateToken<{ id: string }>(token);

            if (!payload) {
                res.status(401).json({ error: 'Invalid token' });
                return;
            }
            const user = await UserModel.findById(payload.id);
            if (!user) {
                res.status(401).json({ error: 'Invalid token - user not found' });
                return;
            }
            req.body.user = user;
            next();

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server Error' })
        }

    }
}