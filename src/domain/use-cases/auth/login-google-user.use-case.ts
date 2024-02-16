import { TokenDto } from "@domain/dtos/auth/token.dto";
import { AuthRepository } from "@domain/repositories/auth.repository";
import { googleVerify } from "../../../presentation/helpers/google-verify";

interface UserExists {
    exists:boolean;
}

interface LoginGoogleUserUseCase {
    execute(tokenDto: TokenDto): Promise<UserExists>
}

export class LoginGoogleUser implements LoginGoogleUserUseCase {

    constructor(
        private readonly authRepository: AuthRepository,
    ){}
    
    async execute(tokenDto: TokenDto): Promise<UserExists> {
        try {
            let payload = await googleVerify(tokenDto.token);
            if(!payload) throw new Error('Invalid token');
            //console.log('payload',payload);
            const exists = await this.authRepository.exists({email:payload.email});
            //todo: cuando el correo no existe, se debe registrar el usuario
           return {
                    exists
           }
        }catch(error){
            console.error('error controlado:',error);
            return{
                exists:false 
            }
        }
}
}    
