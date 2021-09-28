/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router, Response } from 'express';
const router = Router();
import auth from "../middleware/auth"

/* GET home page. */
router.get('/', auth, function (req: any, res: Response) {
  res.render('index', { title: 'Express ' });
});

export default router;
