import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from 'src/auth/jwt-strategy/jwt.guard';
import { AdminGuard } from 'src/core/guards/admin.guard';
import { OwnerGuard } from 'src/core/guards/owner.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtGuard, AdminGuard)
  findAll() {
    return this.usersService.findAll();
  }

    @Get(':id')
    @ApiBearerAuth()
    @UseGuards(JwtGuard, OwnerGuard)
    findOne(@Param('id') id: string) {
      return this.usersService.findOne(+id);
    }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard, OwnerGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard, OwnerGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}