import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Accounts } from "../entity/accounts";
import { ENUM_SERVER } from "../entity/enumserver";
import { InjectRepository } from "@nestjs/typeorm";
import { AccountsSchema } from "../schema/accounts.schema";


@Injectable()
export class AccountsRepository {
    constructor(
        @InjectRepository(AccountsSchema)
        private readonly accountsRepository: Repository<Accounts>,
    ) {}

    async findAll() {
        return this.accountsRepository.find();
    }

    async findById(id: number) {
        return this.accountsRepository.findOne({
            where: { id },
        });
    }

    async findByNick(nick: string) {
        return this.accountsRepository.findOne({
            where: { nick },
        });
    }

    async findByServer(server: ENUM_SERVER) {
        return this.accountsRepository.findOne({
            where: { server },
        });
    }
    async findByElo(elo: string) {
        return this.accountsRepository.findOne({
            where: { elo },
        });
    }
    async findByChampions(champions: number) {
        return this.accountsRepository.findOne({
            where: { champions },
        });
    }
    async findBySkins(skins: number) {
        return this.accountsRepository.findOne({
            where: { skins },
        });
    }

    async createAccount(account: Accounts) {
        return this.accountsRepository.save(account);
    }

    async deleteAccount(id: number) {
        return this.accountsRepository.delete(id);
    }
}