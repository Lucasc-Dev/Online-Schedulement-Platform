import { Request, Response } from "express";
import { container } from 'tsyringe';

import CreateUserService from "@modules/users/services/CreateUserService";
import ShowUserProfileService from "@modules/users/services/ShowUserProfileService";

export default class UsersController {
    public async show(request: Request, response: Response): Promise<Response> {
        const { user_id } = request.params;

        const showUserProfile = container.resolve(ShowUserProfileService);

        const user = await showUserProfile.execute({ id: user_id });

        return response.json(user);
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body;

        const createUser = container.resolve(CreateUserService);

        const user = await createUser.execute({ name, email, password });

        return response.json(user);
    }
}