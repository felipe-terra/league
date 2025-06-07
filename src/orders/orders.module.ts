import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './repository/orders.repository';
import { OrdersItensRepository } from './repository/orders.itens.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './entity/orders';
import { OrdersItens } from './entity/orders.itens';
import { AccountsModule } from 'src/accounts/accounts.module';
import { OrdersItensService } from './orders.itens.service';
import { OrdersItensController } from './orders.itens.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Orders, OrdersItens]), AccountsModule],
    controllers: [OrdersController, OrdersItensController],
    providers: [OrdersService, OrdersRepository, OrdersItensRepository, OrdersItensService],
})
export class OrdersModule {}
