import { EntitySchema } from 'typeorm';
import { Accounts } from '../entity/accounts';

export const AccountsSchema = new EntitySchema<Accounts>({
    name: 'accounts',
    tableName: 'accounts',
    target: Accounts,
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true,
        },
        nick: {
            type: 'varchar',
            length: 100,
            nullable: false,
        },
        server: {
            type: 'varchar',
            length: 100,
            nullable: false,
        },
        level: {
            type: 'int',
            nullable: false,
        },
        elo: {
            type: 'varchar',
            length: 100,
            nullable: false,
        },
        champions: {
            type: 'int',
            nullable: false,
        },
        skins: {
            type: 'int',
            nullable: false,
        },
        price: {
            type: 'int',
            nullable: false,
        },
        status: {
            type: 'varchar',
            length: 100,
            nullable: false,
        },
        createdAt: {
            type: 'timestamp',
            nullable: false,
        },
        lastActivity: {
            type: 'timestamp',
            nullable: false,
        },
    },
});