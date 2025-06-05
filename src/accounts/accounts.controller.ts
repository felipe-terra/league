import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { AccountsService } from "./accounts.service";
import { CreateAccountDto } from "./dto/create-account.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller('accounts')
@ApiTags('accounts')
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