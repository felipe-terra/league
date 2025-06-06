import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { dataSourceOptions } from './core/db/data.source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AccountsModule } from './accounts/accounts.module';
import { OrdersModule } from './orders/orders.module';


@Module({
  imports: [UsersModule, TypeOrmModule.forRoot(dataSourceOptions), AuthModule, AccountsModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
