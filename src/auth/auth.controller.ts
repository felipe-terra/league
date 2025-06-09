import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDTO } from "./dto/login.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { DiscordAuthGuard } from "./discord-strategy/discord.guard";
import { User } from "src/users/entity/user";
import { Request, Response } from 'express';

interface RequestUser extends Request {
    user: User;
}


@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @ApiOperation({ summary: 'Login do usuário' })
    @ApiResponse({ status: 200, description: 'Login realizado com sucesso' })
    @ApiResponse({ status: 401, description: 'Email ou senha inválidos' })
    async login(@Body() loginDTO: LoginDTO) {
        return this.authService.login(loginDTO);
    }

    @Get('discord')
    @UseGuards(DiscordAuthGuard)
    async discordAuth() {
    }

    @Get('discord/callback')
    @UseGuards(DiscordAuthGuard)
    async discordAuthCallback(@Req() req: RequestUser, @Res() res: Response) {
        const result = await this.authService.discordLogin(req.user);
        return res.json(result);
    }
}