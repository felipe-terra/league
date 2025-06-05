import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from '../entity/user';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly dataSource: DataSource) {}

  async findByEmail(email: string) {
    const user = await this.dataSource.getRepository(User).findOne({
      where: { email },
    });
    return user;
  }

  async findById(id: number) {
    const user = await this.dataSource.getRepository(User).findOne({
      where: { id },
    });
    return user;
  }

  async createUser(createUserDto: CreateUserDto) {
    const user = User.newUser(createUserDto);
    return this.dataSource.getRepository(User).save(user);
  }

  async updateUser(id: number, user: User) {
    return this.dataSource.getRepository(User).update(id, user);
  }

  async findAll(){
    return this.dataSource.getRepository(User).find();
  }

  async deleteUser(id: number) {
    const user = await this.dataSource.getRepository(User).findOne({
      where: { id },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return this.dataSource.getRepository(User).delete(id);
  }
}