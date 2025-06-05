import { CreateAccountDto } from "../dto/create-account.dto";
import { ENUM_SERVER } from "./enumserver";
import { ENUM_STATUS } from "./enumstatus";

export class Accounts {
    id: number;
    nick: string;
    server: ENUM_SERVER;
    level: number;
    elo: string;
    champions: number;
    skins: number;
    price: number;
    status: ENUM_STATUS;
    createdAt: Date;
    lastActivity: Date;


    constructor(data: Partial<Accounts>) {
        Object.assign(this, data);
    }

    static newAccount(data: CreateAccountDto) {
        return new Accounts({
            nick: data.nick,
            server: data.server,
            level: data.level,
            elo: data.elo,
            champions: data.champions,
            skins: data.skins,
            price: data.price,
            status: data.status,
            createdAt: new Date(),
            lastActivity: data.lastActivity,
        });
    }
    toJSON() {
        return {
            id: this.id,
            nick: this.nick,
            server: this.server,
            level: this.level,
            elo: this.elo,
            champions: this.champions,
            skins: this.skins,
            price: this.price,
            status: this.status,
            createdAt: this.createdAt,
            lastActivity: this.lastActivity,
        };
    }
}
