import { container } from 'tsyringe';

import ITokenProvider from './TokenProvider/models/ITokenProvider';
import JsonWebToken from './TokenProvider/implementations/JsonWebToken';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<ITokenProvider>(
    'TokenProvider',
    JsonWebToken,
);

container.registerSingleton<IHashProvider>(
    'HashProvider',
    BCryptHashProvider,
)