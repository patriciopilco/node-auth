import { RegisterUserDto } from "../../dtos/auth/register-user.dto";
import { AuthRepository } from "../../repositories/auth.repository";

interface UserRegister {
    user:{
        id:string;
        name:string;
        email:string;
    }
}

interface RegisterUserUseCase {
    execute(registerUserDto: RegisterUserDto): Promise<UserRegister>
}


export class RegisterUser implements RegisterUserUseCase {

    constructor(
        private readonly authRepository: AuthRepository,
     ){}
    async execute(registerUserDto: RegisterUserDto): Promise<UserRegister>{
    const user = await this.authRepository.register(registerUserDto);
           return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        }

    }
}