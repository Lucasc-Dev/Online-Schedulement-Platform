import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import Role from './Role';

@Entity('permissions')
export default class Permission {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @ManyToMany(type => Role)
    @JoinTable({ 
        name: 'permissions_roles',
        joinColumn: {
            name: 'permission_id',
        },
        inverseJoinColumn: {
            name: 'role_id',
        }
    })
    roles: Role[];
}