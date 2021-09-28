import { Router, Request, Response } from 'express';
import { Profile} from '../controllers/profile';
import { upload } from '../controllers/file_uploads';

const router = Router();

/* GET home page. */
router.get('/', function (req: Request, res: Response) {
  res.render('index', { title: 'Express' });
});
router.put('/profile/:id',upload, Profile)
// router.post('/postUser', create)
export default router;

