import IUsersRepository from "../repositories/IUsersRepository";

interface Request {
    name: string;
    email: string;
    password: string;
}

export default class CreateUserService {
    private usersRepository;

    constructor(usersRepository: IUsersRepository) {
        this.usersRepository = usersRepository;
    }

    public async execute({ name, email, password }: Request): Promise<object> {
        const findEmail = await this.usersRepository.findByEmail(email);

        if (findEmail) {
            throw new Error('Email already registred');
        }

        const user = await this.usersRepository.create({ name, email, password });

        return user;
    }
}