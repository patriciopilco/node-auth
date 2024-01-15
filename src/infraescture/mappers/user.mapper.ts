import { CustomerError, UserEntity } from "../../domain";

export class UserMapper {
    static userEntityFromObject(object:{[key:string]:any}){
        const {id, _id, name, email, password, roles} = object;

        if(!_id || !id){
            throw CustomerError.badRequest('Missing id');
        }
        return new UserEntity(
            _id || id,
            name,
            email,
            password,
            roles
        );
    }
}