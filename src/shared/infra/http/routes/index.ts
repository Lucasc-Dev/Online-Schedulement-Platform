import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';

const router = Router();

router.use('/users', usersRouter);

export default router;