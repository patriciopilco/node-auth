

export class LoginGoogleUserDto {
    constructor(
        public googleId:string,
        public email:string,
    ){ }

    static create( object: {[key:string]:any}):[string?, LoginGoogleUserDto?]{
        const { email,googleId}=object;
        if(!email) return ['Missing email'];
        if(!googleId) return ['Missing Id Google'];
        return [
            undefined,
            new LoginGoogleUserDto(googleId, email)
        ];
    }
}