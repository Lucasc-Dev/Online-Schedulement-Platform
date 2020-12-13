import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

import User from '../infra/typeorm/entities/User';

import IUsersRepository from "../repositories/IUsersRepository";
import ITokenProvider from '../providers/TokenProvider/models/ITokenProvider';

interface Request {
    token: string;
    permission: string;
}

interface Response {
    user: User;
    token: string;
}

interface tokenPayload {
    iat: string;
    exp: string;
    sub: string;
}

export default class CheckPermissionService {
    constructor(
        private usersRepository: IUsersRepository,
        private tokenProvider: ITokenProvider,
    ) {}

    public async execute({ token, permission }: Request): Promise<Response> {
        const { sub } = await this.tokenProvider.verifyToken(token, authConfig.jwt.secret) as tokenPayload;

        const user = await this.usersRepository.findById(sub);

        if (!user) {
            throw new AppError('Invalid JWT token');
        }

        if (permission) {
            const containsPermission = user.roles.some(role => 
                role.permissions.some(role_permission => role_permission.name === permission)  
            );
    
            if (!containsPermission) {
                throw new AppError('Insufficient permissions');
            }
        }

        return { user, token };
    }
}