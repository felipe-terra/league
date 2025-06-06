import { Repository } from "typeorm";
import { Orders } from "../entity/orders";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateOrderDto } from "../dto/orders.dto";
import { OrderSchema } from "../schema/orders.schema";
import { Injectable } from "@nestjs/common";

@Injectable()
export class OrdersRepository {
    constructor(
        @InjectRepository(OrderSchema)
        private readonly ordersRepository: Repository<Orders>,
    ) {}

    async createOrder(order: CreateOrderDto) {
        const newOrder = Orders.newOrder(order);
        return this.ordersRepository.save(newOrder);
    }

    async findAll() {
        return this.ordersRepository.find();
    }

    async findById(id: number) {
        return this.ordersRepository.findOne({ where: { id } });
    }
}