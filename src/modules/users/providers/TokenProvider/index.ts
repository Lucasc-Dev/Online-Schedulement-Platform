import { container } from 'tsyringe';

import ITokenProvider from './models/ITokenProvider';
import JsonWebToken from './implementations/JsonWebToken';

container.registerSingleton<ITokenProvider>(
    'TokenProvider',
    JsonWebToken,
);
