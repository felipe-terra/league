import { MigrationInterface, QueryRunner } from "typeorm";

export class Accounts1749147125995 implements MigrationInterface {
    name = 'Accounts1749147125995'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "accounts" ("id" SERIAL NOT NULL, "server" character varying(100) NOT NULL, "level" integer NOT NULL, "elo" character varying(100) NOT NULL, "champions" integer NOT NULL, "skins" integer NOT NULL, "price" integer NOT NULL, "status" character varying(100) NOT NULL, "createdAt" TIMESTAMP NOT NULL, "lastActivity" TIMESTAMP NOT NULL, CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "active" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "active" SET DEFAULT true`);
        await queryRunner.query(`DROP TABLE "accounts"`);
    }

}
