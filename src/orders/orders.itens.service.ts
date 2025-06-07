import { Injectable, NotFoundException } from "@nestjs/common";
import { OrdersItensRepository } from "./repository/orders.itens.repository";
import { OrdersRepository } from "./repository/orders.repository";

@Injectable()
export class OrdersItensService {
    constructor(
        private readonly ordersItensRepository: OrdersItensRepository,
        private readonly ordersRepository: OrdersRepository,
    ) {}

    async findByOrderId(orderId: number) {
        await this.ordersRepository.findById(orderId);
        return this.ordersItensRepository.findByOrderId(orderId);
    }

    async deleteOrderItensByOrderId(orderId: number) {
        return this.ordersItensRepository.deleteOrderItensByOrderId(orderId);
    }
}