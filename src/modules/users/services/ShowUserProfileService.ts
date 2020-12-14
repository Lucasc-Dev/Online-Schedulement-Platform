import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import User from "../infra/typeorm/entities/User";

import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
    id: string;
}

@injectable()
export default class ShowUserProfileService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({ id }: Request): Promise<User> {
        const user = await this.usersRepository.findById(id);

        if (!user) {
            throw new AppError('User not found');
        }

        return user;
    }
}