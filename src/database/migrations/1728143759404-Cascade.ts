import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class Cascade1728143759404 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tasks',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'title',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'description',
                    type: 'text',
                    isNullable: true
                },
                {
                    name: 'status',
                    type: 'enum',
                    enum: ['pending', 'completed'],
                    default: "'pending'"
                },
                {
                    name: 'userId',
                    type: 'uuid',
                    isNullable: false
                },
                {
                    name: 'parentTaskId',
                    type: 'uuid',
                    isNullable: true
                },
                {
                    name: 'create_at',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()'
                }
            ]
        }), true);

        await queryRunner.createForeignKey('tasks', new TableForeignKey({
            columnNames: ['parentTaskId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'tasks',
            onDelete: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('tasks');
        const foreignKey1 = table.foreignKeys.find(fk => fk.columnNames.indexOf('userId') !== -1);
        const foreignKey2 = table.foreignKeys.find(fk => fk.columnNames.indexOf('parentTaskId') !== -1);
        await queryRunner.dropForeignKey('tasks', foreignKey1);
        await queryRunner.dropForeignKey('tasks', foreignKey2);
        await queryRunner.dropTable('tasks');
    }

}
