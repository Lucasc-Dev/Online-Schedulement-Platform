import { getRepository, Repository } from "typeorm";

import ICreateRoleDTO from "@modules/users/dtos/ICreateRoleDTO";

import Role from "../entities/Role";
import IRolesRepository from "@modules/users/repositories/IRolesRepository";

export default class RolesRepository implements IRolesRepository {
    private ormRepository: Repository<Role>;

    constructor() {
        this.ormRepository = getRepository(Role);
    }

    public async create(data: ICreateRoleDTO): Promise<Role> {
        const role = this.ormRepository.create(data);

        await this.ormRepository.save(role);

        return role;
    }

    public async save(role: Role): Promise<Role> {
        await this.ormRepository.save(role);

        return role;
    }

    public async findById(id: string): Promise<Role | undefined> {
        const role = await this.ormRepository.findOne(id, { relations: ['permissions'] });

        return role;
    }

    public async findByName(name: string): Promise<Role | undefined> {
        const role = await this.ormRepository.findOne({ where: { name }, relations: ['permissions'] });

        return role;
    }
}