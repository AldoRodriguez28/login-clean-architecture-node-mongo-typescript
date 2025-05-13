import { Router } from "express";
import { AuthController } from "./controller";
import { AuthDataSourceImpl, AuthRepositoryImpl } from "../../infraestructure";
import { AuthMiddlewar } from "../middlewares/auth.middleware";

export class AuthRoutes {

    static get routes(): Router {
        const router = Router();

        const database = new AuthDataSourceImpl();
        const authRepository = new AuthRepositoryImpl(database);
        const controller = new AuthController(authRepository);


        // Definir todas mis rutas
        router.post('/login', controller.loginUser);
        router.post('/register', controller.registerUser);

        router.get('/users', [AuthMiddlewar.validateJWT], controller.getUser);


        return router;
    }
}