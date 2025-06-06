import { IsArray, IsDate, IsEnum, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { OrderStatus } from "../entity/enumorderstats";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class ItensDto {
    @ApiProperty({ 
        description: 'ID da conta que está sendo comprada',
        example: 123,
        type: Number
    })
    @IsNotEmpty()
    @IsNumber()
    account_id: number;

    @ApiProperty({ 
        description: 'Preço da conta na hora da compra',
        example: 50,
        type: Number
    })
    @IsNotEmpty()
    @IsNumber()
    price_at_purchase: number;
}

export class CreateOrderDto {
    @ApiProperty({ 
        description: 'ID do usuário que está comprando',
        example: 1,
        type: Number
    })
    @IsNotEmpty()
    @IsNumber()
    costumer_id: number;

    @ApiProperty({ 
        description: 'Preço total do pedido',
        example: 100,
        type: Number
    })
    @IsNotEmpty()
    @IsNumber()
    price: number;

    @ApiProperty({ 
        description: 'Data de criação do pedido',
        example: new Date().toISOString(),
        type: String,
        format: 'date-time'
    })
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    date: Date;

    @ApiProperty({ 
        description: 'Status do pedido',
        enum: OrderStatus,
        example: OrderStatus.PENDING,
        enumName: 'OrderStatus'
    })
    @IsNotEmpty()
    @IsEnum(OrderStatus)
    status: OrderStatus;

    @ApiProperty({ 
        description: 'Itens do pedido',
        type: [ItensDto],
        example: [
            {
                account_id: 123,
                price_at_purchase: 50
            },
            {
                account_id: 456,
                price_at_purchase: 50
            }
        ]
    })
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ItensDto)
    itens: ItensDto[];
}