import { Request, Response } from 'express'
import { AuthRepository, CustomerError, RegisterUserDto } from '../../domain';
import { UserModel } from '../../data/mongodb';
import { RegisterUser } from '../../domain/use-cases';

export class AuthController {
    constructor(
        private readonly authRepository: AuthRepository,
    ){}

    private handleError = (error: unknown, res: Response)=>{
        if(error instanceof CustomerError){
            return res.status(error.statusCode).json({error: error.message})
        }
        return res.status(500).json({error: 'Internal server error'})
    }

    registerUser = (req: Request, res: Response)=>{
        const [error, registerUserDto] = RegisterUserDto.create(req.body);

        if( error ) return res.status(400).json( {error} );
        
        new RegisterUser(this.authRepository)
        .execute(registerUserDto!)
        .then(data => res.json(data))
        .catch(error => this.handleError(error, res));
    }

    loginUser = (req: Request, res: Response) => {}

    getUsers = (req: Request, res: Response) => {
        UserModel.find()
        .then(users => res.json({user: req.body.user}))
        .catch(error => res.status(500).json('Internal server error'))
    }
}