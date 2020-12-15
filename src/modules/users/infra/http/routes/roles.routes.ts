import { Router } from 'express';

import permission from '../middlewares/Permission';

import RolesController from '../controllers/RolesController';

const rolesController = new RolesController();

const router = Router();

router.get('/:role_id', permission('ROLE_MANAGE'), rolesController.show);
router.put('/:role_id', permission('ROLE_MANAGE'), rolesController.update);
router.post('/', permission('ROLE_MANAGE'), rolesController.create);

export default router;