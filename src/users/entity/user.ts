import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from '../dto/update-user.dto';

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

  static updateUser(userDTO: UpdateUserDto): User {
    return new User({
      name: userDTO.name,
      email: userDTO.email,
      password: bcrypt.hashSync(userDTO.password, 8),
      active: userDTO.active,
    });
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      active: this.active,
      created_at: this.created_at,
    };
  }
}