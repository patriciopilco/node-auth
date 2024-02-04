
export class TokenDto {
    private constructor(
        public token:string,
    ){}

    static create( object: {[key:string]:any}):[string?, TokenDto?]{
        const { token }=object;

        if(!token) return ['Missing token'];

        return [
            undefined,
            new TokenDto(token)
        ];
    }

}