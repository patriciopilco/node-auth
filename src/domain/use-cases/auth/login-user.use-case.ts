import { JwtAdapter } from "../../../config";
import { LoginUserDto } from "../../dtos/auth/login-user.dto";
import { AuthRepository } from "../../repositories/auth.repository";

interface UserTokenLogin {
    token:string;
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
        const token = await this.signToken({id: user.id},'2h');
        if(!token) throw new Error('Error signing token');
        return {
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
        }
    };
    }
}
