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
    @ApiOperation({ summary: 'Find all accounts' })
    async findAll() {
        return this.accountsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Find account by id' })
    async findById(@Param('id') id: number) {
        return this.accountsService.findById(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create account' })
    async createAccount(@Body() accountDTO: CreateAccountDto) {
        return this.accountsService.createAccount(accountDTO);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete account by id' })
    async deleteAccount(@Param('id') id: number) {
        return this.accountsService.deleteAccount(id);
    }
}