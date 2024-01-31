import { ExistsUserDto } from "@domain/dtos/auth/exists-user.dto";
import { AuthRepository } from "../../repositories/auth.repository";

interface UserExists {
    exists:boolean;
}

interface ExistsUserUseCase {
    execute(existsUserDto: ExistsUserDto): Promise<UserExists>
}

export class ExistsUser implements ExistsUserUseCase {

    constructor(
        private readonly authRepository: AuthRepository,
    ){}
    
    async execute(existsUserDto: ExistsUserDto): Promise<UserExists> {
       const exists = await this.authRepository.exists(existsUserDto);
       return {
                exists
       }
    }
    
}    