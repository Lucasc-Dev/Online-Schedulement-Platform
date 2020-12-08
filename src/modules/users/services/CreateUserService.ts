interface Request {
    name: string;
    email: string;
    password: string;
}

export default class CreateUserService {
    public async execute({ name, email, password }: Request): Promise<object> {
        const user = { name, email, password };

        return user;
    }
}