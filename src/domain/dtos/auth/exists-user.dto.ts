
export class ExistsUserDto {
    private constructor(
        public email:string,
    ){}

    static create( object: {[key:string]:any}):[string?, ExistsUserDto?]{
        const { email }=object;

        if(!email) return ['Missing email'];

        return [
            undefined,
            new ExistsUserDto(email.toLowerCase())
        ];
    }

}