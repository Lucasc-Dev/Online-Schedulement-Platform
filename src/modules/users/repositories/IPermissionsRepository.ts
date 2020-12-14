import Permission from "../infra/typeorm/entities/Permission";

export default interface IPermissionsRepository {
    findManyById(ids: string[]): Promise<Permission[]>;
    findById(id: string): Promise<Permission | undefined>;
    findByName(name: string): Promise<Permission | undefined>;
    create(data: { name: string }): Promise<Permission>;
    save(permission: Permission): Promise<Permission>;
}