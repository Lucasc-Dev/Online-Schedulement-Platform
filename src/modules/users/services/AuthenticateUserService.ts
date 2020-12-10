import authConfig from '@config/auth';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from "../repositories/IUsersRepository";

import User from '../infra/typeorm/entities/User';
import ITokenProvider from '../providers/TokenProvider/models/ITokenProvider';
interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

export default class AuthenticateUserService {
    constructor(
        private usersRepository: IUsersRepository,
        private hashProvider: IHashProvider,
        private tokenProvider: ITokenProvider,
    ) {}

    public async execute({ email, password }: Request): Promise<Response> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new Error('Wrong email/password combination.');
        }
        const comparePassword = await this.hashProvider.compareHash(password, user.password);
        
        if (!comparePassword) {
            throw new Error('Wrong email/password combination.');
        }
        
        const { secret, expiresIn } = authConfig.jwt;

        const token = await this.tokenProvider.generateToken({ 
            subject: user.id,
            secret,
            expiresIn,
        });

        return { user, token };
    }
}