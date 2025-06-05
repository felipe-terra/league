import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDTO } from "./dto/login.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

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
}