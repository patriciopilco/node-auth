import { Validators } from "../../../config";

export class RegisterGoogleUserDto {

    private constructor(
    public googleId: string,
    public email: string,
    public name: string,
    public picture:string,
    ){}


    static create( object: {[key: string]:any}):[string?, RegisterGoogleUserDto?]{
        const { name, email, googleId, picture} = object;
        if(!name) return ['Missing name'];
        if(!email) return ['Missing name'];
        if(!Validators.email.test(email)) return ['Email is not valid'];
        if(!googleId)return ['Missing User Google']
        if(!picture) return ['Missing picture'];
        return [undefined,
        new RegisterGoogleUserDto(
            googleId,email.toLowerCase(),name,picture
        )];
    }
}