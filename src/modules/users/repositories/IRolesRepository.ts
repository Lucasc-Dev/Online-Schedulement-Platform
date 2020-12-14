import Role from "../infra/typeorm/entities/Role";

import ICreateRoleDTO from "../dtos/ICreateRoleDTO";

export default interface IRolesRepository {
    findById(id: string): Promise<Role | undefined>;
    findByName(name: string): Promise<Role | undefined>;
    create(data: ICreateRoleDTO): Promise<Role>;
    save(Role: Role): Promise<Role>;
}