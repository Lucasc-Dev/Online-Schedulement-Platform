import { Request, Response } from "express";
import { container } from 'tsyringe';

import CreateRoleService from '../../../services/CreateRoleService';
import UpdateRoleService from "../../../services/UpdateRoleService";
import ShowRoleService from "../../../services/ShowRoleService";

export default class RolesController {
    public async show(request: Request, response: Response): Promise<Response> {
        const { role_id } = request.params;

        const showRole = container.resolve(ShowRoleService);

        const role = await showRole.execute({ id: role_id });

        return response.json(role);
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const { name, permissions } = request.body;

        const createRole = container.resolve(CreateRoleService);

        const role = await createRole.execute({ name, permissions });

        return response.json(role);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const { role_id } = request.params;
        const { name, permissions } = request.body;

        const updateRole = container.resolve(UpdateRoleService);

        const role = await updateRole.execute({ id: role_id, name, permissions });

        return response.json(role);
    }
}