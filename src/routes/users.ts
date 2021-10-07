import { Router, Request, Response } from 'express';
import { signUpUser, verifyUser } from '../controller/user.controller';
import { getProjectsByUser, updateProjectByOwner } from '../controller/findProject.controller';
import { isLoggedIn } from '../middleware/auth-check';
import { projectAuth } from '../middleware/projectAuth';
const router = Router();

/* GET users listing. */
router.get('/', function (_req: Request, res: Response) {
  res.send('respond with a resource');
});
router.post('/signup', signUpUser);

router.post('/verify/:id', verifyUser);
router.get('/getproject', isLoggedIn, getProjectsByUser);
router.post('/getproject/:projectID', isLoggedIn, projectAuth, updateProjectByOwner);

export default router;
