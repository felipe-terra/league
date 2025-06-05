import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UserRepository 
  ) {}

  async create(userDTO: CreateUserDto){
    if(await this.userRepository.findByEmail(userDTO.email)) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const newUser = await this.userRepository.createUser(userDTO);
    return newUser.toJSON();
  }

  async updateUser(id: number, userDTO: UpdateUserDto){ 
    const user = await this.userRepository.findById(id);
    if(!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const updatedUser = User.updateUser(userDTO);
    await this.userRepository.updateUser(id, updatedUser);
    return updatedUser.toJSON();
  }

  async findOne(id: number){
    const user = await this.userRepository.findById(id);
    if(!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user.toJSON();
  }

  async findAll(){
    return this.userRepository.findAll();
  }

  async findByEmail(email: string){
    return this.userRepository.findByEmail(email);
  }


  async remove(id: number){
    await this.userRepository.deleteUser(id);
  }
}