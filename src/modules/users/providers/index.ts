import { container } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IRolesRepository from '@modules/users/repositories/IRolesRepository';
import RolesRepository from '@modules/users/infra/typeorm/repositories/RolesRepository';

import IPermissionsRepository from '@modules/users/repositories/IPermissionsRepository';
import PermissionsRepository from '@modules/users/infra/typeorm/repositories/PermissionsRepository';

import ITokenProvider from './TokenProvider/models/ITokenProvider';
import JsonWebToken from './TokenProvider/implementations/JsonWebToken';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';


container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
);

container.registerSingleton<IRolesRepository>(
    'RolesRepository',
    RolesRepository,
);

container.registerSingleton<IPermissionsRepository>(
    'PermissionsRepository',
    PermissionsRepository,
);

container.registerSingleton<ITokenProvider>(
    'TokenProvider',
    JsonWebToken,
);

container.registerSingleton<IHashProvider>(
    'HashProvider',
    BCryptHashProvider,
)