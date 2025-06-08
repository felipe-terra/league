import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/orders.dto";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "src/auth/jwt-strategy/jwt.guard";
import { AdminGuard } from "src/core/guards/admin.guard";

@Controller('orders')
@ApiTags('orders')
@UseGuards(JwtGuard)
@ApiBearerAuth()
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @ApiOperation({ summary: 'Cria um novo pedido' })
    @Post()
    async createOrder(@Body() order: CreateOrderDto) {
        return this.ordersService.createOrder(order);
    }

    @ApiOperation({ summary: 'Deleta um pedido' })
    @Delete(':id')
    @UseGuards(AdminGuard)
    async deleteOrder(@Param('id') id: number) {
        return this.ordersService.deleteOrder(id);
    }

    @ApiOperation({ summary: 'Lista todos os pedidos' })
    @UseGuards(AdminGuard)
    @Get()
    async findAll() {
        return this.ordersService.findAll();
    }
}