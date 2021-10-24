import { Router, Request, Response } from 'express';
import { signUpUser, verifyUser } from '../controller/user.controller';
import { getActivities, getTodayActivities, getYesterActivities, getYesterdayActivities } from '../controller/activities-controllers';
import { isLoggedIn } from '../middleware/auth-check';
const router = Router();

/* GET users listing. */
router.get('/', function (_req: Request, res: Response) {
  res.send('respond with a resource');
});
router.post('/signup', signUpUser);

router.get('/verify/:id', verifyUser);

router.get('/:projectID/activities', isLoggedIn, getTodayActivities);
router.get('/:projectID/previous-activities', isLoggedIn, getYesterActivities);

export default router;
