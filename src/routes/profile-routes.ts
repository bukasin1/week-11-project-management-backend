import { Router } from 'express';
import { upload } from '../controller/file_uploads';
import { Profile } from '../controller/profile';
import { showProfile } from '../controller/profile-controller';
import { createTask} from '../controller/task';
import { authCheck, isLoggedIn } from '../middleware/auth-check';
const router = Router();

router.get('/', isLoggedIn, showProfile);
router.put('/edit',isLoggedIn,upload,Profile)
router.post('/:projectId/task',isLoggedIn,upload,createTask)
// router.delete('deleteTask', deleteTask )
// router.post('/:projectId/task', createTask)

export default router;
