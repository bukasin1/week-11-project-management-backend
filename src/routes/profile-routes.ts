import { Router } from 'express';
import { showProfile } from '../controllers/profile-controller';
import authCheck from '../middlewares/auth-check';
const router = Router();

router.get('/', authCheck, showProfile);

export default router;
