import { Controller, Delete, Get, Param, UseGuards } from "@nestjs/common";
import { OrdersItensService } from "./orders.itens.service";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "src/auth/jwt-strategy/jwt.guard";

@Controller('orders-itens')
@ApiTags('orders-itens')
@UseGuards(JwtGuard)
@ApiBearerAuth()
export class OrdersItensController {
    constructor(private readonly ordersItensService: OrdersItensService) {}

    @ApiOperation({ summary: 'Lista todos os itens de um pedido' })
    @Get(':orderId')
    async findByOrderId(@Param('orderId') orderId: number) {
        return this.ordersItensService.findByOrderId(orderId);
    }

    @ApiOperation({ summary: 'Deleta todos os itens de um pedido' })
    @Delete(':orderId')
    async deleteOrderItensByOrderId(@Param('orderId') orderId: number) {
        return this.ordersItensService.deleteOrderItensByOrderId(orderId);
    }
}