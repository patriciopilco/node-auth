import { TokenDto } from "@domain/dtos/auth/token.dto";
import { JwtAdapter } from "../../../config/jwt";
import { AuthRepository } from "@domain/repositories/auth.repository";
import e from "express";
import { IdentifyUserDto } from "@domain/dtos/auth/identify-user.dto";


interface RefreshToken {
    token:string;
    refresh_token:string;
}

interface RefreshTokenUseCase {
    execute(identifyUserDto:IdentifyUserDto): Promise<RefreshToken>
}

type SignToken = (payload:Object, durarion?:string)=>Promise<string|null>;

export class RefreshUser implements RefreshTokenUseCase {

    constructor(
        private readonly signToken: SignToken = JwtAdapter.generateToken,
    ){}
    async execute(identifyUserDto:IdentifyUserDto): Promise<RefreshToken> {
        const token = await this.signToken({id: identifyUserDto.id},'1200s');
        const refresh_token = await this.signToken({id: identifyUserDto.id},'1320s');
        if(!token) throw new Error('Error signing token');
        if(!refresh_token) throw new Error('Error signing token');
        return {
                token: token,
                refresh_token: refresh_token,
        };
    }
}
