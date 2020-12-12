import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import Role from './Role';

@Entity('roles')
export default class Permission {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @ManyToMany(type => Role)
    @JoinTable({ name: 'permissions_roles' })
    roles: Role[];
}