import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCores1748745944944 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cores',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'index',
            type: 'int',
          },
          {
            name: 'type',
            type: 'varchar',
          },  
          {
            name: 'max_clock_speed',
            type: 'decimal',
            precision: 5,
            scale: 2,
          },
          {
            name: 'local_cache',
            type: 'int'
          },
          {
            name: 'multithreading',
            type: 'boolean'
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cores');
  }
}

