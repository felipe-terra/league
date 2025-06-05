import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDTO {
    @ApiProperty({
        description: 'Email do usuário',
        example: 'teste@teste.com',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'Senha do usuário',
        example: '123456',
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}