import { Request, Response } from "express";

export default class ProfilesController {
    public async show(request: Request, response: Response): Promise<Response> {
        const { user } = request;

        return response.json(user);
    }
}