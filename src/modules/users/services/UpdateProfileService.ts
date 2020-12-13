import { injectable, inject } from 'tsyringe';
import AppError from "@shared/errors/AppError";

import User from '../infra/typeorm/entities/User';

import IHashProvider from "../providers/HashProvider/models/IHashProvider";
import IUsersRepository from "../repositories/IUsersRepository";

interface Request {
    user: User,
    name: string;
    email: string;
    oldPassword: string;
    password: string;
}

@injectable()
export default class CreateProfileService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ user, name, email, oldPassword, password }: Request): Promise<object> {
        if (email !== user.email) {
            const findEmail = await this.usersRepository.findByEmail(email);
    
            if (findEmail) {
                throw new AppError('Email already registered');
            }
        }

        if (oldPassword) {
            const compare = await this.hashProvider.compareHash(oldPassword, user.password);

            if (!compare) {
                throw new AppError('Old password does not match');
            }

            if (password) {
                user.password = await this.hashProvider.generateHash(password);
            }
        }

        user.name = name;
        user.email = email;

        await this.usersRepository.save(user);

        return user;
    }
}