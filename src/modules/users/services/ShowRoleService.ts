import { injectable, inject } from 'tsyringe';
import AppError from "@shared/errors/AppError";

import IRolesRepository from '../repositories/IRolesRepository';

interface Request {
    id: string;
}

@injectable()
export default class ShowRoleService {
    constructor(
        @inject('RolesRepository')
        private rolesRepository: IRolesRepository,
    ) {}

    public async execute({ id }: Request): Promise<object> {
        let role = await this.rolesRepository.findById(id);

        if (!role) {
            role = await this.rolesRepository.findByName(id);

            if (!role) {
                throw new AppError('Role not found');
            }
        }

        return role;
    }
}