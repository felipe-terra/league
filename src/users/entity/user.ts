import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  name: string;
  email: string;
  password: string;
  active: boolean;
  created_at: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }


  static newUser(createUserDto: CreateUserDto): User {
    return new User({
      name: createUserDto.name,
      email: createUserDto.email,
      password: bcrypt.hashSync(createUserDto.password, 8),
      active: true,
      created_at: new Date(),
    });
  }
  static toJSON(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      active: user.active,
      created_at: user.created_at,
    };
  }
}