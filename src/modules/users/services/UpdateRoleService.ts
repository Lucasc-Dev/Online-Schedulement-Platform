import { injectable, inject } from 'tsyringe';
import AppError from "@shared/errors/AppError";

import IRolesRepository from '../repositories/IRolesRepository';
import IPermissionsRepository from '../repositories/IPermissionsRepository';

interface Request {
    id: string;
    name: string;
    permissions: string[];
}

@injectable()
export default class CreateRoleService {
    constructor(
        @inject('RolesRepository')
        private rolesRepository: IRolesRepository,

        @inject('PermissionsRepository')
        private permissionsRepository: IPermissionsRepository,
    ) {}

    public async execute({ id, name, permissions }: Request): Promise<object> {
        const role = await this.rolesRepository.findById(id);

        if (!role) {
            throw new AppError('Role not found');
        }

        if (role.name !== name) {
            const findName = await this.rolesRepository.findByName(name);

            if (findName) {
                throw new AppError('Name already in use');
            }
        }

        const serializedPermissions = await this.permissionsRepository.findManyById(permissions);
        
        role.name = name;
        role.permissions = serializedPermissions;

        await this.rolesRepository.save(role);

        return role;
    }
}