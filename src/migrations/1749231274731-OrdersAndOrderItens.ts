import { MigrationInterface, QueryRunner } from "typeorm";

export class OrdersAndOrderItens1749231274731 implements MigrationInterface {
    name = 'OrdersAndOrderItens1749231274731'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."orders_status_enum" AS ENUM('pending', 'paid', 'cancelled')`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, "costumer_id" integer NOT NULL, "price" integer NOT NULL, "date" date NOT NULL, "status" "public"."orders_status_enum" NOT NULL, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders_itens" ("id" SERIAL NOT NULL, "order_id" integer NOT NULL, "account_id" integer NOT NULL, "price_at_purchase" integer NOT NULL, CONSTRAINT "PK_65f4dbf4eff225e86a1e495ef3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_c76809e752bb6c6ee858a9ebc0d" FOREIGN KEY ("costumer_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders_itens" ADD CONSTRAINT "FK_6b7a6cdad137f268edbaa9d6c4b" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders_itens" ADD CONSTRAINT "FK_b1bc6f2f2967a216b7bfb473358" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders_itens" DROP CONSTRAINT "FK_b1bc6f2f2967a216b7bfb473358"`);
        await queryRunner.query(`ALTER TABLE "orders_itens" DROP CONSTRAINT "FK_6b7a6cdad137f268edbaa9d6c4b"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_c76809e752bb6c6ee858a9ebc0d"`);
        await queryRunner.query(`DROP TABLE "orders_itens"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TYPE "public"."orders_status_enum"`);
    }

}
