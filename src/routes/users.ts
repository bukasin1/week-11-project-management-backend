import { Router, Request, Response } from 'express';
import { signUpUser, verifyUser } from '../controller/user.controller';
import authenticateJWT from '../authentication/auth';
import { isLoggedIn } from '../middleware/auth-check';
import { projectAuth } from '../middleware/projectAuth';
const router = Router();

/* GET users listing. */
router.get('/', function (_req: Request, res: Response) {
  res.send('respond with a resource');
});
router.post('/signup', signUpUser);

router.post('/verify/:id', verifyUser);

export default router;
