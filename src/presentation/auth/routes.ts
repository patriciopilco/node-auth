import { Router } from 'express';
import { AuthController } from './controller';
import { AuthDatasourceImpl, AuthRepositoryImpl } from '../../infraescture';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export class AuthRoutes {
    static get routes(): Router {
        const router = Router();
        const datasource = new AuthDatasourceImpl();
        const authRepository = new AuthRepositoryImpl(datasource);
        const controller = new AuthController(authRepository);

        //Definir todas la rutas principales

        router.get('/',AuthMiddleware.validateJWT, controller.getUsers);
        router.post('/login', controller.loginUser);
        router.post('/register', controller.registerUser);
       

        return router;
    }
}