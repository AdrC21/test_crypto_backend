import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService
    ){}

    async generateToken(payload:any, expiresIn:string){
        return await  this.jwtService.signAsync({payload},{expiresIn: expiresIn, secret:process.env.JWT_SECRET})
    }
    async verifyToken(token:string){
        return await this.jwtService.verifyAsync(token,{secret:process.env.JWT_SECRET})
    }
    
    async decodeToken(token:string){
        return await this.jwtService.decode(token)
    }
}
