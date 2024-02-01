import { ExistsUserDto } from "@domain/dtos/auth/exists-user.dto";
import { IdentifyUserDto } from "@domain/dtos/auth/identify-user.dto";
import { AuthRepository } from "@domain/repositories/auth.repository";


interface Profile{
    profile:{
        name:string;
        email:string;
    }
}
interface ProfileUserUseCase {
    execute(identifyUserDto:IdentifyUserDto): Promise<Profile>
}
export class ProfileUser implements ProfileUserUseCase{

    constructor(  private readonly authRepository: AuthRepository,){
    }
    async execute(identifyUserDto:IdentifyUserDto): Promise<Profile> {
        const user = await this.authRepository.profile(identifyUserDto);
        return {
            profile: {
                name: user.name,
                email: user.email
            }
        }
        
    }

}