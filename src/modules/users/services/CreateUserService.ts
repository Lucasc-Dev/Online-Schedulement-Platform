import { injectable, inject } from 'tsyringe';
import AppError from "@shared/errors/AppError";

import IHashProvider from "../providers/HashProvider/models/IHashProvider";
import IUsersRepository from "../repositories/IUsersRepository";

interface Request {
    name: string;
    email: string;
    password: string;
}

@injectable()
export default class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ name, email, password }: Request): Promise<object> {
        const findEmail = await this.usersRepository.findByEmail(email);

        if (findEmail) {
            throw new AppError('Email already registred');
        }

        const hashedPassword = await this.hashProvider.generateHash(password);

        const user = await this.usersRepository.create({ name, email, password: hashedPassword });

        return user;
    }
}