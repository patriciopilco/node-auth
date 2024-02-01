import { Request, Response } from 'express'
import { AuthRepository, CustomerError, RegisterUserDto } from '../../domain';
import { UserModel } from '../../data/mongodb';
import { RegisterUser, ExistsUser } from '../../domain/use-cases';
import { LoginUserDto } from '../../domain/dtos/auth/login-user.dto';
import { LoginUser } from '../../domain/use-cases/auth/login-user.use-case';
import { ExistsUserDto } from '../../domain/dtos/auth/exists-user.dto';
import { IdentifyUserDto } from '../../domain/dtos/auth/identify-user.dto';
import { ProfileUser } from '../../domain/use-cases/auth/profile-user.use-case';



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

    loginUser = (req: Request, res: Response) => {
       const [error, loginUserDto] = LoginUserDto.create(req.body);
       if( error ) return res.status(400).json( {error} );
       new LoginUser(this.authRepository)
       .execute(loginUserDto!)
       .then(data => res.json(data))
       .catch(error => this.handleError(error, res));
    }

    existsUser = (req: Request, res: Response) => {
        const [error, existsUserDto] = ExistsUserDto.create(req.body);
        if( error ) return res.status(400).json( {error} );
        new ExistsUser(this.authRepository)
        .execute(existsUserDto!)
        .then(data => res.json(data))
        .catch(error => this.handleError(error, res));
      
    }

    profileUser = (req: Request, res: Response) => {
        const [error, identifyUserDto] = IdentifyUserDto.create(req.body);
        if( error ) return res.status(400).json( {error} );
        new ProfileUser(this.authRepository)
        .execute(identifyUserDto!)
        .then(data => res.json(data))
        .catch(error => this.handleError(error, res));
    }

}