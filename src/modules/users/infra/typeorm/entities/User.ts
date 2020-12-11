import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, JoinColumn } from 'typeorm';

import Role from './Role';

@Entity('users')
export default class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @ManyToMany(type => Role)
    @JoinTable({ 
        name: 'users_roles',
        joinColumn: {
            name: 'user_id',
        },
        inverseJoinColumn: {
            name: 'role_id',
        },
    })
    roles: Role[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}