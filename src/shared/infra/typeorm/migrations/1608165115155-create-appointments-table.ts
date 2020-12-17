import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createAppointmentsTable1608165115155 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'appointments',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'patient_id',
                        type: 'uuid',
                    },
                    {
                        name: 'doctor_id',
                        type: 'uuid',
                    },
                    {
                        name: 'status',
                        type: 'varchar',
                    },
                    {
                        name: 'date',
                        type: 'timestamp',
                    },
                    {
                        name: 'reason',
                        type: 'varchar',
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
            })
        );

        await queryRunner.createForeignKey(
            'appointments',
            new TableForeignKey({
                name: 'PatientID',
                referencedTableName: 'users',
                columnNames: ['patient_id'],
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            })
        );

        await queryRunner.createForeignKey(
            'appointments',
            new TableForeignKey({
                name: 'DoctorID',
                referencedTableName: 'users',
                columnNames: ['doctor_id'],
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('appointments', 'DoctorID');
        await queryRunner.dropForeignKey('appointments', 'PatientId');

        await queryRunner.dropTable('appointments');
    }

}
