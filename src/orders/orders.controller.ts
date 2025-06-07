import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/orders.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @ApiOperation({ summary: 'Cria um novo pedido' })
    @ApiResponse({ status: 201, description: 'Pedido criado com sucesso' })
    @ApiResponse({ status: 400, description: 'Erro ao criar pedido' })
    @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
    @Post()
    async createOrder(@Body() order: CreateOrderDto) {
        return this.ordersService.createOrder(order);
    }

    @ApiOperation({ summary: 'Deleta um pedido' })
    @ApiResponse({ status: 200, description: 'Pedido deletado com sucesso' })
    @ApiResponse({ status: 400, description: 'Erro ao deletar pedido' })
    @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
    @Delete(':id')
    async deleteOrder(@Param('id') id: number) {
        return this.ordersService.deleteOrder(id);
    }

    @ApiOperation({ summary: 'Lista todos os pedidos' })
    @ApiResponse({ status: 200, description: 'Pedidos listados com sucesso' })
    @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
    @Get()
    async findAll() {
        return this.ordersService.findAll();
    }
}