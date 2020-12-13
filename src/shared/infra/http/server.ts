import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';

import express from 'express';

import routes from './routes';

import ErrorHandler from '../middlewares/ErrorHandler';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(express.json());
app.use(routes);

app.use(ErrorHandler);

app.listen(3333, () => {
    console.log('Server listening on port 3333');
});