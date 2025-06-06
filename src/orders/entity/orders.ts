import { Entity } from "typeorm";
import { OrderStatus } from "./enumorderstats";
import { CreateOrderDto } from "../dto/orders.dto";
import { User } from "src/users/entity/user";

@Entity()
export class Orders {
    id: number;
    costumer_id: number; 
    costumer: User;
    price: number;
    date: Date;
    status: OrderStatus;


    constructor(order: Partial<Orders>) {
        Object.assign(this, order);
    }

    static newOrder(orderDto: CreateOrderDto) {
        return new Orders({
            costumer_id: orderDto.costumer_id,
            price: orderDto.price,
            date: orderDto.date,
            status: orderDto.status
        });
    }

    toJson() {
        return {
            id: this.id,
            costumer_id: this.costumer_id,
            price: this.price,
            date: this.date,
            status: this.status
        };
    }
}