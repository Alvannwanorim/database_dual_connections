import { MigrationInterface, QueryRunner } from "typeorm";

export class generateTables1647517887399 implements MigrationInterface {
  name = "generateTables1647517887399";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "clearance_tgs" ("ik_number" character varying NOT NULL, "staff_id" character varying NOT NULL, "msb_id" character varying NOT NULL, "clearance_staff_id" character varying NOT NULL, "clearance_field_size" character varying NOT NULL, "tg_lead_name" character varying NOT NULL, "tg_lead_unique_member_id" character varying NOT NULL, "face_rec_status" character varying NOT NULL, "scanned_receipt_flag" character varying NOT NULL, "scanned_receipt_code" character varying NOT NULL, "season" character varying NOT NULL, "crop" character varying NOT NULL, "mapping_field" character varying NOT NULL, "voucher_id" character varying NOT NULL, "bvn" character varying NOT NULL, "prepaid_card_details" character varying NOT NULL, "no_prepaid_flag" character varying NOT NULL, "template" character varying NOT NULL, "IMEI" character varying NOT NULL, "latitude" character varying NOT NULL, "longitude" character varying NOT NULL, "edit_count" character varying NOT NULL, "clearance_date" character varying NOT NULL, "location_id" character varying NOT NULL, "app_version" character varying NOT NULL, "date_updated" TIMESTAMP NOT NULL DEFAULT now(), "location_pickup_id" character varying NOT NULL, CONSTRAINT "PK_9d307bf6b0d78f336c1796ca172" PRIMARY KEY ("ik_number"))`
    );
    await queryRunner.query(
      `CREATE INDEX "msb_idt" ON "clearance_tgs" ("msb_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "location_id" ON "clearance_tgs" ("location_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "date_updatedt" ON "clearance_tgs" ("date_updated") `
    );
    await queryRunner.query(
      `CREATE TABLE "clearance_members" ("unique_member_id" character varying NOT NULL, "ik_number" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "staff_id" character varying NOT NULL, "msb_id" character varying NOT NULL, "clearance_staff_id" character varying NOT NULL, "clearance_field_size" character varying NOT NULL, "IMEI" character varying NOT NULL, "latitude" character varying NOT NULL, "longitude" character varying NOT NULL, "location_id" character varying NOT NULL, "clearance_date" character varying NOT NULL, "app_version" character varying NOT NULL, "date_updated" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_90925309e4c2f235e94558c1b1e" PRIMARY KEY ("unique_member_id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "ik_number" ON "clearance_members" ("ik_number") `
    );
    await queryRunner.query(
      `CREATE INDEX "staff_id" ON "clearance_members" ("staff_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "msb_idm" ON "clearance_members" ("msb_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "date_updatedm" ON "clearance_members" ("date_updated") `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."date_updatedt"`);
    await queryRunner.query(`DROP INDEX "public"."msb_idt"`);
    await queryRunner.query(`DROP INDEX "public"."staff_id"`);
    await queryRunner.query(`DROP INDEX "public"."ik_number"`);
    await queryRunner.query(`DROP TABLE "clearance_members"`);
    await queryRunner.query(`DROP INDEX "public"."date_updatedm"`);
    await queryRunner.query(`DROP INDEX "public"."location_id"`);
    await queryRunner.query(`DROP INDEX "public"."msb_idm"`);
    await queryRunner.query(`DROP TABLE "clearance_tgs"`);
  }
}
