import { Router } from 'express';

import permission from '../middlewares/Permission';

import ProfilesController from '../controllers/ProfilesController';

const profilesController = new ProfilesController();

const router = Router();

router.get('/', permission(''), profilesController.show);

export default router;