import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('roles')
export default class Role {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    status: string;

    @Column()
    reason: string;

    @Column()
    date: Date;

    @ManyToOne(type => User)
    @JoinColumn({ name: 'patient_id' })
    patient: User;
    
    @ManyToOne(type => User)
    @JoinColumn({ name: 'doctor_id' })
    doctor: User;

    @UpdateDateColumn()
    updated_at: Date;

    @CreateDateColumn()
    created_at: Date;
}