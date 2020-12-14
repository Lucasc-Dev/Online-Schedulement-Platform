import { injectable, inject } from 'tsyringe';
import AppError from "@shared/errors/AppError";

import User from '../infra/typeorm/entities/User';

import IHashProvider from "../providers/HashProvider/models/IHashProvider";
import IUsersRepository from "../repositories/IUsersRepository";

interface Request {
    user_id: string,
    name: string;
    email: string;
    password: string;
}

@injectable()
export default class UpdateUserProfileService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ user_id, name, email, password }: Request): Promise<object> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('User not found');
        }

        if (email !== user.email) {
            const findEmail = await this.usersRepository.findByEmail(email);
    
            if (findEmail) {
                throw new AppError('Email already registered');
            }
        }

        if (password){
            user.password = await this.hashProvider.generateHash(password);
        }

        user.name = name;
        user.email = email;

        await this.usersRepository.save(user);

        return user;
    }
}