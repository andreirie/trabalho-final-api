import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddProcessorIdToCores1748750550957 implements MigrationInterface {

 public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("cores", 
            new TableColumn({
                name: "processor_id",
                type: "uuid",
                isNullable: true,
        }));
        await queryRunner.createForeignKey("cores", 
            new TableForeignKey({
                name: "OrdersProcessor",
                columnNames: ["processor_id"],
                referencedTableName: "processors",
                referencedColumnNames: ["id"],
                onDelete: "SET NULL",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('cores', 'OrdersProcessor');
        await queryRunner.dropColumn('cores', 'processor_id')
    }

}
