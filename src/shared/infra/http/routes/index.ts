import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';

const router = Router();

router.use('/users', usersRouter);
router.use('/sessions', sessionsRouter);

export default router;