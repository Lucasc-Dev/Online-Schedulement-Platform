import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class usersRolesRelationTable1607716828841 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users_roles',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'user_id',
                    type: 'uuid',
                },
                {
                    name: 'role_id',
                    type: 'uuid',
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
                }
            ],
        }));


        await queryRunner.createForeignKey(
            'users_roles', 
            new TableForeignKey({
                name: 'RoleId',
                referencedTableName: 'roles',
                columnNames: ['role_id'],
                referencedColumnNames: ['id'],
            },
        ));

        await queryRunner.createForeignKey(
            'users_roles', 
            new TableForeignKey({
                name: 'UserId',
                referencedTableName: 'users',
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
            },
        ));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('users_roles', 'UserId');
        await queryRunner.dropForeignKey('users_roles', 'RoleId');

        await queryRunner.dropTable('users_roles');
    }

}
