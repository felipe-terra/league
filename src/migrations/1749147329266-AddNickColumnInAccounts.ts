import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNickColumnInAccounts1749147329266 implements MigrationInterface {
    name = 'AddNickColumnInAccounts1749147329266'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" ADD "nick" character varying(100) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "nick"`);
    }

}
