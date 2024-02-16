import { ExistsUserDto } from "@domain/dtos/auth/exists-user.dto";
import { IdentifyUserDto } from "@domain/dtos/auth/identify-user.dto";
import { LoginUserDto } from "@domain/dtos/auth/login-user.dto";
import { RegisterUserDto } from "@domain/dtos/auth/register-user.dto";
import { UserEntity } from "@domain/entites/user.entity";
import { LoginGoogleUserDto } from "@domain/dtos/auth/login-google-user.dto";
import { RegisterGoogleUserDto } from "@domain/dtos/auth/register-google-user.dto";


export abstract class AuthRepository {

    abstract register(registerUserDto: RegisterUserDto):Promise<UserEntity>
    abstract registerGoogle(registerGoogleUserDto: RegisterGoogleUserDto): Promise<UserEntity>
    abstract login(loginUserDto: LoginUserDto):Promise<UserEntity>
    abstract loginGoogle(loginGoogleUserDto:LoginGoogleUserDto):Promise<UserEntity>
    abstract exists(existsUserDto: ExistsUserDto):Promise<boolean>
    abstract profile(identifyUserDto: IdentifyUserDto):Promise<UserEntity>

}