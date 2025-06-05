import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AccountsRepository } from "./repository/accounts.repository";
import { CreateAccountDto } from "./dto/create-account.dto";
import { Accounts } from "./entity/accounts";

@Injectable()
export class AccountsService {
    constructor(private readonly accountsRepository: AccountsRepository) {}

    async findAll() {
        return this.accountsRepository.findAll();
    }

    async findById(id: number) {
        return this.accountsRepository.findById(id);
    }

    async createAccount(accountDTO: CreateAccountDto) {
        if(await this.accountsRepository.findByNick(accountDTO.nick)) throw new HttpException('Nick already exists', HttpStatus.BAD_REQUEST);
        const account = Accounts.newAccount(accountDTO);
        return this.accountsRepository.createAccount(account);
    }

    async deleteAccount(id: number) {
        if(!await this.accountsRepository.findById(id)) throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
        return this.accountsRepository.deleteAccount(id);
    }


}