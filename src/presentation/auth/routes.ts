import { Router } from 'express';

export class AuthRoutes {
    static get routes(): Router {
        const router = Router();

        //Definir todas la rutas principales

        router.post('/login', (req, res) => {
            res.json('Login');
        });
        router.post('/register', (req, res) =>{
            res.json('Registrer');
        })

        return router;
    }
}