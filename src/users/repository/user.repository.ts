import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entity/user';
import { CreateUserDto } from '../dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSchema } from '../schema/user.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserSchema)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    return user;
  }

  async findById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    return user;
  }

  async createUser(createUserDto: CreateUserDto) {
    const user = User.newUser(createUserDto);
    return this.userRepository.save(user);
  }

  async updateUser(id: number, user: User) {
    return this.userRepository.update(id, user);
  }

  async findAll(){
    return this.userRepository.find();
  }

  async deleteUser(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return this.userRepository.delete(id);
  }
}