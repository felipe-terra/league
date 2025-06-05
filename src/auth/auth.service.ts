import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { LoginDTO } from "./dto/login.dto";

@Injectable()
export class AuthService {
    constructor(
    private readonly usersService: UsersService, 
    private readonly jwtService: JwtService
    ) {}

    async login(loginDTO: LoginDTO) {
        const user = await this.usersService.findByEmail(loginDTO.email);
        if (!user) throw new UnauthorizedException('Usuário não encontrado');
        console.log('Senha fornecida:', loginDTO.password);
        console.log('Senha armazenada:', user.password);
        
        // Tente ambos os métodos para comparar
        const isPasswordValid1 = await bcrypt.compare(loginDTO.password, user.password);
        const isPasswordValid2 = bcrypt.compareSync(loginDTO.password, user.password);
        
        console.log('Resultado bcrypt.compare:', isPasswordValid1);
        console.log('Resultado bcrypt.compareSync:', isPasswordValid2);
        if (!isPasswordValid1) throw new UnauthorizedException('Senha inválida');
        const payload = { id:  user.id, email: user.email, name: user.name};
        const jwt = await this.jwtService.signAsync(payload, {
            expiresIn: '1d',
            secret: process.env.JWT_SECRET,
        });
        return {
            access_token: jwt,
        };
    }
}