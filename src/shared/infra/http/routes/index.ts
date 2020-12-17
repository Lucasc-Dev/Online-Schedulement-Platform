import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import rolesRouter from '@modules/users/infra/http/routes/roles.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import profilesRouter from '@modules/users/infra/http/routes/profiles.routes';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';

const router = Router();

router.use('/users', usersRouter);
router.use('/roles', rolesRouter);
router.use('/sessions', sessionsRouter);
router.use('/profiles', profilesRouter);
router.use('/appointments', appointmentsRouter);

export default router;