import { Request, Response } from "express";
import { container } from 'tsyringe';

import CreateRoleService from '../../../services/CreateRoleService';

export default class RolesController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { name, permissions } = request.body;

        const createRole = container.resolve(CreateRoleService);

        const role = await createRole.execute({ name, permissions });

        return response.json(role);
    }
}