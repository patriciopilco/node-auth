import { TokenDto } from "@domain/dtos/auth/token.dto";
import { JwtAdapter } from "../../../config";
import { AuthRepository } from "@domain/repositories/auth.repository";
import { googleVerify } from "../../../presentation/helpers/google-verify";
import { UserEntity } from "@domain/entites/user.entity";
import { CustomerError } from "../../errors/custom.error";

interface UserTokenLogin {
    token:string;
    refresh_token:string;
    user:{
        id:string;
        name:string;
        email:string;
    }
}

interface LoginGoogleUserUseCase {
    execute(tokenDto: TokenDto): Promise<UserTokenLogin>
}

type SignToken = (payload:Object, durarion?:string)=>Promise<string|null>;

export class LoginGoogleUser implements LoginGoogleUserUseCase {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly signToken: SignToken = JwtAdapter.generateToken,
    ){}
    
    async execute(tokenDto: TokenDto): Promise<UserTokenLogin> {
        try {
        let payload = await googleVerify(tokenDto.token);
        try {
            if(!payload) throw new Error('Invalid token');
            let user:UserEntity = await this.authRepository.loginGoogle({googleId:payload.sub, email:payload.email});
            const token = await this.signToken({id: user.id},'1200s');
            if(!token) throw new Error('Error generating token');
            const refresh_token = await this.signToken({id: user.id},'1320s');
            if(!refresh_token) throw new Error('Error generating refresh token');
           return {
                    token:token,
                    refresh_token:refresh_token,
                    user:{
                        id:user.id,
                        name:user.name,
                        email:user.email
                    }
           }
        }catch(error){
            if(error instanceof CustomerError) {
                if(error.message === 'Google User not found'){
                    const user  = await this.authRepository.registerGoogle({googleId:payload.sub, email:payload.email, name:payload.name, picture:payload.picture});
                    if(!user) throw new Error('Error creating user');
                    const token = await this.signToken({id: user.id},'1200s');
                    if(!token) throw new Error('Error generating token');
                    const refresh_token = await this.signToken({id: user.id},'1320s');
                    if(!refresh_token) throw new Error('Error generating refresh token');
                    
                   return {
                            token:token,
                            refresh_token:refresh_token,
                            user:{
                                id:user.id,
                                name:user.name,
                                email:user.email
                            }
                   }
                }
            }
            console.error('error controlado:',error);
            throw new Error('Error Login Google User');
        }
    }catch(error){
        if (error instanceof Error) {
            throw CustomerError.badRequest(error.message);
          } else {
            throw new Error('Login Google Error');
          }
    }

}
}    
