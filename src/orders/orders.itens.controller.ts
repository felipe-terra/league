import { Controller, Delete, Get, Param } from "@nestjs/common";
import { OrdersItensService } from "./orders.itens.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { ApiResponse } from "@nestjs/swagger";

@Controller('orders-itens')
@ApiTags('orders-itens')
export class OrdersItensController {
    constructor(private readonly ordersItensService: OrdersItensService) {}

    @ApiOperation({ summary: 'Lista todos os itens de um pedido' })
    @ApiResponse({ status: 200, description: 'Itens listados com sucesso' })
    @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
    @Get(':orderId')
    async findByOrderId(@Param('orderId') orderId: number) {
        return this.ordersItensService.findByOrderId(orderId);
    }

    @ApiOperation({ summary: 'Deleta todos os itens de um pedido' })
    @ApiResponse({ status: 200, description: 'Itens deletados com sucesso' })
    @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
    @Delete(':orderId')
    async deleteOrderItensByOrderId(@Param('orderId') orderId: number) {
        return this.ordersItensService.deleteOrderItensByOrderId(orderId);
    }
}