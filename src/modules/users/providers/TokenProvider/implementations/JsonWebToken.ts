import { sign, verify } from 'jsonwebtoken';

import ITokenProvider from "../models/ITokenProvider";
import IGenerateTokenDTO from '@modules/users/dtos/IGenerateTokenDTO';

export default class JsonWebToken implements ITokenProvider {
    public async generateToken({ subject, secret, expiresIn }: IGenerateTokenDTO): Promise<string> {
        const token = sign({}, secret, { 
            subject,
            expiresIn,
        });

        return token;
    }

    public async verifyToken(token: string, secret: string): Promise<string | object> {
        const decoded = verify(token, secret);

        return decoded;
    }
}