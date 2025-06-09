import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { AccountsService } from "./accounts.service";
import { CreateAccountDto } from "./dto/create-account.dto";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import {  JwtGuard } from "../auth/jwt-strategy/jwt.guard";
import { AdminGuard } from "src/core/guards/admin.guard";

@Controller('accounts')
@ApiTags('accounts')
@UseGuards(JwtGuard, AdminGuard)
@ApiBearerAuth()
export class AccountsController {
    constructor(private readonly accountsService: AccountsService) {}

    @Get()
    async findAll() {
        return this.accountsService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: number) {
        return this.accountsService.findById(id);
    }

    @Post()
    async createAccount(@Body() accountDTO: CreateAccountDto) {
        return this.accountsService.createAccount(accountDTO);
    }

    @Delete(':id')
    async deleteAccount(@Param('id') id: number) {
        return this.accountsService.deleteAccount(id);
    }
}