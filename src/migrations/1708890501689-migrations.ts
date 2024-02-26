import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1708890501689 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`invoice\` ADD \`status\` ENUM('Placed', 'Delivered', 'Cancelled') NOT NULL DEFAULT 'Placed'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`invoice\` DROP COLUMN \`status\``);
  }
}
