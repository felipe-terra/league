import { EntitySchema } from "typeorm";
import { OrdersItens } from "../entity/orders.itens";

export const OrderItensSchema = new EntitySchema<OrdersItens>({
    name: "OrdersItens",
    target: OrdersItens,
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: "increment"
        },
        order_id: {
            type: "int",
            nullable: false
        },
        account_id: {
            type: "int",
            nullable: false
        },
        price_at_purchase: {
            type: "int",
            nullable: false
        }
    },
    relations: {
        order_id: {
            type: "many-to-one",
            target: "Orders",
            inverseSide: "ordersItens",
            joinColumn: {
                name: "order_id",
                referencedColumnName: "id"
            }
        },
        account_id: {
            type: "many-to-one",
            target: "Accounts",
            inverseSide: "ordersItens",
            joinColumn: {
                name: "account_id",
                referencedColumnName: "id"
            }
        }
    }
});