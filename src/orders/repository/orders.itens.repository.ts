import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { OrdersItens } from "../entity/orders.itens";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderItensSchema } from "../schema/orders.itens.schema";
import { ItensDto } from "../dto/orders.dto";

@Injectable()
export class OrdersItensRepository {
    constructor(
        @InjectRepository(OrderItensSchema)
        private readonly ordersItensRepository: Repository<OrdersItens>,
    ) {}

    async createOrderItens(orderItens: ItensDto, orderId: number) {
        const newOrderItens = OrdersItens.newOrderItens(orderItens);
        newOrderItens.order_id = orderId;
        return this.ordersItensRepository.save(newOrderItens);
    }

    async findByOrderId(orderId: number) {
        return this.ordersItensRepository.find({ where: { order_id: orderId } });
    }
}