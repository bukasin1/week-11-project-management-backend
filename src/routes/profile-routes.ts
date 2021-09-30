import { Router } from 'express';
import { showProfile } from '../controller/profile-controller';
import { authCheck, isLoggedIn } from '../middleware/auth-check';
const router = Router();

router.get('/', isLoggedIn, showProfile);

export default router;
