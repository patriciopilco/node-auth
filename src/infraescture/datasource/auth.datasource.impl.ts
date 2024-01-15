import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { AuthDatasource, CustomerError, RegisterUserDto, UserEntity } from "../../domain";
import { UserMapper } from "../mappers/user.mapper";

type HashFunction = (password:string)=>string;
type CompareFunction = (password:string, hashed:string)=>boolean;

export class AuthDatasourceImpl implements AuthDatasource {

    constructor(
        private readonly hashPassword: HashFunction = BcryptAdapter.hash,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare,
    ){}

    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
       
        const { name, email, password } = registerUserDto;
        
        try{

            //1. verificar si el correo existe
            const exist = await UserModel.findOne({email});
            if(exist) throw CustomerError.badRequest('User already exists');

            const user = await UserModel.create({
                name:name,
                email:email,
                password:this.hashPassword(password),
            })

            await user.save();
            return UserMapper.userEntityFromObject(user);

        }catch (error){

            if(error instanceof CustomerError) {
                throw error
            }
            throw CustomerError.internalServer();
        }
    }

}
