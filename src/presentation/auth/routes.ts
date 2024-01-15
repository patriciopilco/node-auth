import { Router } from 'express';
import { AuthController } from './controller';
import { AuthDatasourceImpl, AuthRepositoryImpl } from '../../infraescture';

export class AuthRoutes {
    static get routes(): Router {
        const router = Router();
        const datasource = new AuthDatasourceImpl();
        const authRepository = new AuthRepositoryImpl(datasource);
        const controller = new AuthController(authRepository);

        //Definir todas la rutas principales

        router.post('/login', controller.loginUser);
        router.post('/register', controller.registerUser);
       

        return router;
    }
}