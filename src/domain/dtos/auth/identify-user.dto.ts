

export class IdentifyUserDto {
    constructor(
        public id:string,
    ){ }

    static create( object: {[key:string]:any}):[string?, IdentifyUserDto?]{
        const { user }=object;
        if(!user.id) return ['Missing id'];
        return [
            undefined,
            new IdentifyUserDto(user.id)
        ];
    }
}