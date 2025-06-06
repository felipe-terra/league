import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsRepository } from './repository/accounts.repository';
import { AccountsSchema } from './schema/accounts.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsController } from './accounts.controller';
import { Accounts } from './entity/accounts';

@Module({
    imports: [TypeOrmModule.forFeature([Accounts])],
    controllers: [AccountsController],
    providers: [AccountsService, AccountsRepository],
    exports: [AccountsService, AccountsRepository],
})
export class AccountsModule {}
