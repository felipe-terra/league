import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategyService } from './jwt-strategy/jwt.stategy';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtService, JwtStrategyService],
  imports: [UsersModule],
})
export class AuthModule {}