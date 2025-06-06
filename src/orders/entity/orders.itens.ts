import { Entity } from "typeorm";
import { ItensDto } from "../dto/orders.dto";

@Entity()
export class OrdersItens {
    id: number;
    order_id: number; 
    account_id: number; 
    price_at_purchase: number; 

    constructor(orderItens: Partial<OrdersItens>) {
        Object.assign(this, orderItens);
    }

    static newOrderItens(orderItensDto: ItensDto) {
        return new OrdersItens({
            account_id: orderItensDto.account_id,
            price_at_purchase: orderItensDto.price_at_purchase
        });
    }

    toJson() {
        return {
            id: this.id,
            order_id: this.order_id,
            account_id: this.account_id,
            price_at_purchase: this.price_at_purchase
        };
    }
}