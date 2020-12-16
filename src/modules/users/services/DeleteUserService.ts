import { injectable, inject } from 'tsyringe';
import AppError from "@shared/errors/AppError";

import IUsersRepository from "../repositories/IUsersRepository";

interface Request {
    user_id: string;
}

@injectable()
export default class DeleteUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}
    public async execute({ user_id }: Request): Promise<void> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('User not found');
        }

        await this.usersRepository.delete(user.id);   
    }
}