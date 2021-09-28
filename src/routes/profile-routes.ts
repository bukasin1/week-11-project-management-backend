import { Router } from 'express';
import { showProfile } from '../controllers/profile-controller';
import { authCheck, isLoggedIn } from '../middlewares/auth-check';
const router = Router();

router.get('/', isLoggedIn, showProfile);

export default router;
