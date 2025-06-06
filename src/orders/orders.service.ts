import { BadRequestException, Injectable } from "@nestjs/common";
import { OrdersRepository } from "./repository/orders.repository";
import { OrdersItensRepository } from "./repository/orders.itens.repository";
import { CreateOrderDto } from "./dto/orders.dto";
import { ENUM_STATUS } from "src/accounts/entity/enumstatus";
import { AccountsRepository } from "src/accounts/repository/accounts.repository";

@Injectable()
export class OrdersService {
    constructor(
        private readonly ordersRepository: OrdersRepository,
        private readonly ordersItensRepository: OrdersItensRepository,
        private readonly accountsRepository: AccountsRepository,
    ) {}

    async createOrder(order: CreateOrderDto) {
        const newOrder = await this.ordersRepository.createOrder(order);
        
        for (const item of order.itens) {
            const account = await this.accountsRepository.findById(item.account_id);
            
            if (!account || account.status !== ENUM_STATUS.AVAILABLE) {
                throw new BadRequestException(`Conta ${item.account_id} não está disponível para compra`);
            }
            

            await this.ordersItensRepository.createOrderItens(item, newOrder.id);
        }

        const orderItems = await this.ordersItensRepository.findByOrderId(newOrder.id);

        return {
            ...newOrder,
            itens: orderItems
        };
    }
}