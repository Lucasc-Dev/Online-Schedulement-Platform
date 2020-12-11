import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class permissionsRolesRelationTable1607711828005 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'permissions_roles',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'role_id',
                    type: 'uuid',
                },
                {
                    name: 'permission_id',
                    type: 'uuid',
                }
            ],
        }));


        await queryRunner.createForeignKey(
            'permissions_roles', 
            new TableForeignKey({
                name: 'RoleId',
                referencedTableName: 'roles',
                columnNames: ['role_id'],
                referencedColumnNames: ['id'],
            },
        ));

        await queryRunner.createForeignKey(
            'permissions_roles', 
            new TableForeignKey({
                name: 'PermissionId',
                referencedTableName: 'permissions',
                columnNames: ['permission_id'],
                referencedColumnNames: ['id'],
            },
        ));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('permissions_roles', 'PermissionId');
        await queryRunner.dropForeignKey('permissions_roles', 'RoleId');

        await queryRunner.dropTable('permissions_roles');
    }

}
