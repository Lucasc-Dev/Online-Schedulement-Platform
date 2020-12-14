import { Router } from 'express';

import UsersController from '../controllers/UsersController';
import permission from '../middlewares/Permission';

const router = Router();

const usersController = new UsersController();

router.get('/:user_id', permission(''), usersController.show);
router.put('/:user_id', permission(''), usersController.update);
router.post('', usersController.create);

export default router;