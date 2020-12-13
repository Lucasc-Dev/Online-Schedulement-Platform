import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import rolesRouter from '@modules/users/infra/http/routes/roles.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import profilesRouter from '@modules/users/infra/http/routes/profiles.routes';

const router = Router();

router.use('/users', usersRouter);
router.use('/roles', rolesRouter);
router.use('/sessions', sessionsRouter);
router.use('/profiles', profilesRouter);

export default router;