import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty({ example: 1, description: 'ID único do usuário' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'John Doe', description: 'Nome do usuário' })
  @Column({ length: 100 })
  name: string;

  @ApiProperty({ example: 'john@example.com', description: 'Email do usuário' })
  @Column({ length: 100 })
  email: string;

  @ApiProperty({ example: 'senha123', description: 'Senha do usuário (criptografada)' })
  @Column({ length: 100 })
  password: string;

  @ApiProperty({ example: true, description: 'Status do usuário' })
  @Column({ default: true })
  active: boolean;

  @ApiProperty({ example: '2023-07-21T00:00:00Z', description: 'Data de criação' })
  @CreateDateColumn()
  created_at: Date;
} 