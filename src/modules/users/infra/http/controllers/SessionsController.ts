import { Request, Response } from "express";

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

import HashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import TokenProvider from '@modules/users/providers/TokenProvider/implementations/JsonWebToken';
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";

export default class SessionsController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;

        const hashProvider = new HashProvider();
        const tokenProvider = new TokenProvider();
        const usersRepository = new UsersRepository();

        const authenticateUser = new AuthenticateUserService(
            usersRepository,
            hashProvider,
            tokenProvider,
        );

        const user = await authenticateUser.execute({ email, password });

        return response.json(user);
    }
}