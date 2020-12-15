import { Router } from 'express';

import permission from '../middlewares/Permission';

import ProfilesController from '../controllers/ProfilesController';

const profilesController = new ProfilesController();

const router = Router();

router.get('/', permission('PROFILE_MANAGE'), profilesController.show);
router.put('/', permission('PROFILE_MANAGE'), profilesController.update);

export default router;