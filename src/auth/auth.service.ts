import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { LoginDTO } from "./dto/login.dto";
import { User } from "src/users/entity/user";

@Injectable()
export class AuthService {
    constructor(
    private readonly usersService: UsersService, 
    private readonly jwtService: JwtService
    ) {}

    async login(loginDTO: LoginDTO) {
        const user = await this.usersService.findByEmail(loginDTO.email);
        if (!user) throw new UnauthorizedException('Usuário não encontrado');
        if (!await bcrypt.compare(loginDTO.password, user.password)) throw new UnauthorizedException('Senha inválida');
        const payload = { id:  user.id, email: user.email, name: user.name, type: user.type};
        const jwt = await this.jwtService.signAsync(payload, {
            expiresIn: '1d',
            secret: process.env.JWT_SECRET,
        });
        return {
            access_token: jwt,
        };
    }

    async discordLogin(user: User) {
        const payload = { id:  user.id, email: user.email, name: user.name, type: user.type};
        const jwt = await this.jwtService.signAsync(payload, {
            expiresIn: '1d',
            secret: process.env.JWT_SECRET,
        });
        return {
            access_token: jwt,
        };
    }
}