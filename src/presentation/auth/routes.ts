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

        router.post('/login', controller.loginUser);
        router.post('/register', controller.registerUser);
        //todo: add middleware to validate jwt
        //router.get('/',AuthMiddleware.validateJWT,);
        return router;
    }
}