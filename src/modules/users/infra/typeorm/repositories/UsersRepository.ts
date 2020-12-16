import { getRepository, Repository } from "typeorm";

import User from "../entities/User";

import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";

export default class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async findById(id: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({ where: { id }, relations: ['roles'] });

        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({ where: { email } });

        return user;
    }

    public async create(data: ICreateUserDTO): Promise<User> {
        const user = this.ormRepository.create(data);

        await this.ormRepository.save(user);

        return user;
    }

    public async save(user: User): Promise<User> {
        await this.ormRepository.save(user);

        return user;
    }

    public async delete(user_id: string): Promise<void> {
        await this.ormRepository.delete(user_id);
    }
}