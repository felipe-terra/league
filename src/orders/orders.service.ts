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
        let calculatedTotalPrice = 0;
        //Loop para calcular o preço total do pedido e atualizar o preço de compra de cada item
        for (const item of order.itens) { 
            const account = await this.accountsRepository.findById(item.account_id);
            
            if (!account || account.status !== ENUM_STATUS.AVAILABLE) {
                throw new BadRequestException(`Conta ${item.account_id} não está disponível para compra`);
            }
            
            calculatedTotalPrice += account.price;
            
            item.price_at_purchase = account.price;
        }
        
        order.price = calculatedTotalPrice;
        
        const newOrder = await this.ordersRepository.createOrder(order);
        

        //Loop para criar os itens do pedido
        for (const item of order.itens) {
            await this.ordersItensRepository.createOrderItens(item, newOrder.id);
        }
        
        const orderItems = await this.ordersItensRepository.findByOrderId(newOrder.id);
        
        return {
            ...newOrder,
            itens: orderItems
        };
    }

    async deleteOrder(id: number) {
        await this.ordersRepository.findById(id);
        await this.ordersItensRepository.deleteOrderItensByOrderId(id);
        return this.ordersRepository.deleteOrder(id);
    }

    async findAll() {
        return this.ordersRepository.findAll();
    }
}