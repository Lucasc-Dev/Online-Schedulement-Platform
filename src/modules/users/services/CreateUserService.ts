import IHashProvider from "../providers/HashProvider/models/IHashProvider";
import IUsersRepository from "../repositories/IUsersRepository";

interface Request {
    name: string;
    email: string;
    password: string;
}

export default class CreateUserService {
    constructor(
        private usersRepository: IUsersRepository,
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ name, email, password }: Request): Promise<object> {
        const findEmail = await this.usersRepository.findByEmail(email);

        if (findEmail) {
            throw new Error('Email already registred');
        }

        const hashedPassword = await this.hashProvider.generateHash(password);

        const user = await this.usersRepository.create({ name, email, password: hashedPassword });

        return user;
    }
}