import 'dotenv/config';

import express from 'express';

import routes from './routes';

import '@shared/infra/typeorm';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
    console.log('Server listening on port 3333');
});