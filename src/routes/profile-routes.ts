import { Router } from 'express';
import { upload } from '../controller/file_uploads';
import { create, Profile } from '../controller/profile';
import { showProfile } from '../controller/profile-controller';
import { authCheck, isLoggedIn } from '../middleware/auth-check';
const router = Router();

router.get('/', isLoggedIn, showProfile);
router.put('/edit',isLoggedIn,upload, Profile)
router.post('/postUser', create)

export default router;
