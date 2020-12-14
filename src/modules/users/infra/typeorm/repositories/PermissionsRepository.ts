import { getRepository, Repository } from "typeorm";

import Permission from "../entities/Permission";
import IPermissionsRepository from "@modules/users/repositories/IPermissionsRepository";

export default class PermissionsRepository implements IPermissionsRepository {
    private ormRepository: Repository<Permission>;

    constructor() {
        this.ormRepository = getRepository(Permission);
    }

    public async create(data: { name: string }): Promise<Permission> {
        const permission = this.ormRepository.create(data);

        await this.ormRepository.save(permission);

        return permission;
    }

    public async save(permission: Permission): Promise<Permission> {
        await this.ormRepository.save(permission);

        return permission;
    }

    public async findManyById(ids: string[]): Promise<Permission[]> {
        const permissions = await this.ormRepository.findByIds(ids);

        return permissions;
    } 

    public async findById(id: string): Promise<Permission | undefined> {
        const permission = await this.ormRepository.findOne(id);

        return permission;
    }

    public async findByName(name: string): Promise<Permission | undefined> {
        const permission = await this.ormRepository.findOne({ where: { name } });

        return permission;
    }
}