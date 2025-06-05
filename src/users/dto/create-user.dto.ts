import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ 
    example: 'John Doe', 
    description: 'Nome do usuário',
    required: true
  })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsString({ message: 'O nome deve ser uma string' })
  name: string;

  @ApiProperty({ 
    example: 'john@example.com', 
    description: 'Email do usuário',
    required: true
  })
  @IsNotEmpty({ message: 'O email é obrigatório' })
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @ApiProperty({ 
    example: 'senha123', 
    description: 'Senha do usuário',
    required: true,
    minLength: 6
  })
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  password: string;

  @ApiProperty({ 
    example: true, 
    description: 'Status do usuário',
    required: true
  })
  @IsNotEmpty({ message: 'O status é obrigatório' })
  @IsBoolean({ message: 'O status deve ser um booleano' })
  active: boolean;
}