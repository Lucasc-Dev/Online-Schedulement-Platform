import { injectable, inject } from 'tsyringe';
import AppError from "@shared/errors/AppError";

import IRolesRepository from '../repositories/IRolesRepository';
import IPermissionsRepository from '../repositories/IPermissionsRepository';

interface Request {
    name: string;
    permissions: string[];
}

@injectable()
export default class UpdateRoleService {
    constructor(
        @inject('RolesRepository')
        private rolesRepository: IRolesRepository,

        @inject('PermissionsRepository')
        private permissionsRepository: IPermissionsRepository,
    ) {}

    public async execute({ name, permissions }: Request): Promise<object> {
        const findRole = await this.rolesRepository.findByName(name);

        if (findRole) {
            throw new AppError('Role already registred');
        }

        const serializedPermissions = await this.permissionsRepository.findManyById(permissions);
        
        const role = await this.rolesRepository.create({ name, permissions: serializedPermissions });

        return role;
    }
}