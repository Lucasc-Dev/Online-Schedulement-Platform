import { Router } from 'express';

import UsersController from '../controllers/UsersController';
import permission from '../middlewares/Permission';

const router = Router();

const usersController = new UsersController();

router.get('/:user_id', permission('USER_MANAGE'), usersController.show);
router.put('/:user_id', permission('USER_MANAGE'), usersController.update);
router.delete('/:user_id', permission('USER_MANAGE'), usersController.delete);
router.post('', usersController.create);

export default router;