import { Router } from 'express';

import permission from '../middlewares/Permission';

import RolesController from '../controllers/RolesController';

const rolesController = new RolesController();

const router = Router();

router.get('/:role_id', permission(''), rolesController.show);
router.put('/:role_id', permission(''), rolesController.update);
router.post('/', permission(''), rolesController.create);

export default router;