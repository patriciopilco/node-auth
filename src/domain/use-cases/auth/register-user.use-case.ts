import { JwtAdapter } from "../../../config";
import { RegisterUserDto } from "../../dtos/auth/register-user.dto";
import { AuthRepository } from "../../repositories/auth.repository";

interface UserToken {
    token:string;
    user:{
        id:string;
        name:string;
        email:string;
    }
}

interface RegisterUserUseCase {
    execute(registerUserDto: RegisterUserDto): Promise<UserToken>
}

type SignToken = (payload:Object, durarion?:string)=>Promise<string|null>;
export class RegisterUser implements RegisterUserUseCase {

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly signToken: SignToken = JwtAdapter.generateToken,
    ){}
    async execute(registerUserDto: RegisterUserDto): Promise<UserToken>{

        const user = await this.authRepository.register(registerUserDto);
        const token = await this.signToken({id: user.id},'2h');

        if(!token) throw new Error('Error signing token');

        return {
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        }

    }
}