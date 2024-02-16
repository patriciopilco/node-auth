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
        router.post('/login/google', controller.loginUserGoogle);
        router.post('/register', controller.registerUser);
        router.post('/exists', controller.existsUser);
        router.post('/profile',AuthMiddleware.validateJWT,controller.profileUser);
        router.post('/refresh',controller.refreshToken);
        return router;
    }
}