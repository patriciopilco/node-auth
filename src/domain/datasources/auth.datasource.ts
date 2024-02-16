import { IdentifyUserDto } from "@domain/dtos/auth/identify-user.dto";
import { ExistsUserDto } from "../dtos/auth/exists-user.dto";
import { LoginUserDto } from "../dtos/auth/login-user.dto";
import { RegisterUserDto } from "../dtos/auth/register-user.dto";
import { UserEntity } from "../entites/user.entity";
import { LoginGoogleUserDto } from "@domain/dtos/auth/login-google-user.dto";
import { RegisterGoogleUserDto } from "@domain/dtos/auth/register-google-user.dto";

export abstract class AuthDatasource {

    abstract register(registerUserDto: RegisterUserDto):Promise<UserEntity>
    abstract registerGoogle(registerGoogleUserDto: RegisterGoogleUserDto): Promise<UserEntity>
    abstract login(loginUserDto: LoginUserDto):Promise<UserEntity>
    abstract loginGoogle(loginGoogleUserDto:LoginGoogleUserDto):Promise<UserEntity>
    abstract exists(existsUserDto: ExistsUserDto):Promise<boolean>
    abstract profile(identifyUserDto: IdentifyUserDto):Promise<UserEntity>

}