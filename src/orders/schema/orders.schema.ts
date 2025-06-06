import { EntitySchema } from "typeorm";
import { Orders } from "../entity/orders";
import { OrderStatus } from "../entity/enumorderstats";

export const OrderSchema = new EntitySchema<Orders>({
    name: "Orders",
    target: Orders,
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: "increment"
        },
        costumer_id: {
            type: "int",
            nullable: false
        },
        price: {
            type: "int",
            nullable: false
        },
        date: {
            type: "date",
            nullable: false
        },
        status: {
            type: "enum",
            enum: OrderStatus,
            nullable: false
        }
    },
    relations: {
        costumer: {
            type: "many-to-one",
            target: "users",
            joinColumn: {
                name: "costumer_id",
                referencedColumnName: "id"
            }
        }
    }
});