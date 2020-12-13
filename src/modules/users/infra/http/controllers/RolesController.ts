import { Request, Response } from "express";

export default class RolesController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { name, permissions } = request.body;

        return response.json();
    }
}