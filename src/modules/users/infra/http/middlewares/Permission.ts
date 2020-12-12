import { Request, Response, NextFunction } from "express";

import AppError from "@shared/errors/AppError";

import CheckPermissionService from "../../../services/CheckPermissionService";

import TokenProvider from '@modules/users/providers/TokenProvider/implementations/JsonWebToken';
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";

export default function permission(permission: string) {
    const execute = async (request: Request, response: Response, next: NextFunction) => {
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            throw new AppError('Missing JWT token');
        }

        const token = authHeader.split(' ')[1];

        const tokenProvider = new TokenProvider();
        const usersRepository = new UsersRepository();

        const checkPermission = new CheckPermissionService(usersRepository, tokenProvider);

        const { user } = await checkPermission.execute({ token, permission });

        request.user = user;

        return next();
    }

    return execute;
}