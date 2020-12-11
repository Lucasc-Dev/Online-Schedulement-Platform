import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import Permission from './Permission';

@Entity('roles')
export default class Role {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToMany(type => Permission)
    @JoinTable({
        name: 'permissions_roles',
        joinColumn: {
            name: 'role_id',
        },
        inverseJoinColumn: {
            name: 'permission_id',
        }
    })
    permissions: Permission[];
}