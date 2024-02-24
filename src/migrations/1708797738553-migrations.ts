import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddInvoiceStatus1708797738553 implements MigrationInterface {
  // Define the name of the table and column we're modifying
  private tableName = 'invoice';
  private columnName = 'status';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add the 'status' column with type 'enum' to the 'invoices' table
    await queryRunner.addColumn(
      this.tableName,
      new TableColumn({
        name: this.columnName,
        type: 'enum',
        enum: ['Placed', 'Delivered', 'Cancelled'],
        isNullable: false, // or true, depending on your requirements
        default: "'Placed'", // Default status. Make sure to wrap it with extra single quotes for SQL strings
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove the 'status' column from the 'invoices' table in the down method
    await queryRunner.dropColumn(this.tableName, this.columnName);
  }
}
