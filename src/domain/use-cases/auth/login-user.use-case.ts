import { JwtAdapter } from "../../../config";
import { LoginUserDto } from "../../dtos/auth/login-user.dto";
import { AuthRepository } from "../../repositories/auth.repository";

interface UserTokenLogin {
    token:string;
    refresh_token:string;
    user:{
        id:string;
        name:string;
        email:string;
    }
}

interface LoginUserUseCase {
    execute(loginUserDto:LoginUserDto): Promise<UserTokenLogin>
}

type SignToken = (payload:Object, durarion?:string)=>Promise<string|null>;
export class LoginUser implements LoginUserUseCase {

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly signToken: SignToken = JwtAdapter.generateToken,
    ){}
    async execute(loginUserDto:LoginUserDto): Promise<UserTokenLogin> {
        const user = await this.authRepository.login(loginUserDto);
        const token = await this.signToken({id: user.id},'1200s');
        const refresh_token = await this.signToken({id: user.id},'1320s');
        if(!token) throw new Error('Error signing token');
        if(!refresh_token) throw new Error('Error signing token');
        return {
            token: token,
            refresh_token: refresh_token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
        }
    };
    }
}
