import { Request, Response } from "express";
import { container } from 'tsyringe';

import UpdateProfileService from '../../../services/UpdateProfileService';

export default class ProfilesController {
    public async show(request: Request, response: Response): Promise<Response> {
        const { user } = request;

        return response.json(user);
    }
    
    public async update(request: Request, response: Response): Promise<Response> {
        const { user } = request;
        const { email, name, oldPassword, password } = request.body;

        const updateProfile = container.resolve(UpdateProfileService);

        const newUser = await updateProfile.execute({ user, email, name, oldPassword, password });
        
        return response.json(newUser);
    }
}