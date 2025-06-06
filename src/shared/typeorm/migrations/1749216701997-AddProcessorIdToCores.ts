import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddProcessorIdToCores1749216701997 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("cores", 
            new TableColumn({
                name: "processor_id",
                type: "uuid",
                isNullable: true,
        }));
        await queryRunner.createForeignKey("cores", 
            new TableForeignKey({
                name: "CoresProcessors",
                columnNames: ["processor_id"],
                referencedTableName: "processors",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('cores', 'CoresProcessors');
        await queryRunner.dropColumn('cores', 'processor_id')
    }

}
