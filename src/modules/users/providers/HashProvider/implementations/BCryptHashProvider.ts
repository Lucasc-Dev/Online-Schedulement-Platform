import { hash, compare } from 'bcrypt';

import IHashProvider from "../models/IHashProvider";

export default class BCryptHashProvider implements IHashProvider {
    public async generateHash(payload: string): Promise<string> {
        return hash(payload, 8);
    }

    public async compareHash(payload: string, hashed: string) {
        return compare(payload, hashed);
    }
}