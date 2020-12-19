import { Router } from 'express';

import permission from '@modules/users/infra/http/middlewares/Permission';

import AppointmentsController from '../controller/AppointmentsController';

const router = Router();

const appointmentsController = new AppointmentsController();

router.get('/:appointment_id', permission(''), appointmentsController.show);
router.post('/', permission(''), appointmentsController.create);

export default router;