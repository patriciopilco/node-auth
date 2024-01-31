import { ExistsUserDto } from "../dtos/auth/exists-user.dto";
import { LoginUserDto } from "../dtos/auth/login-user.dto";
import { RegisterUserDto } from "../dtos/auth/register-user.dto";
import { UserEntity } from "../entites/user.entity";

export abstract class AuthDatasource {

    abstract register(registerUserDto: RegisterUserDto):Promise<UserEntity>
    abstract login(loginUserDto: LoginUserDto):Promise<UserEntity>
    abstract exists(existsUserDto: ExistsUserDto):Promise<boolean>

}