import { Router, Request, Response } from 'express';
const router = Router();

/* GET home page. */
router.get('/', function (req: Request, res: Response) {
  res.render('index', { title: 'Project Mangement Auth' });
});

export default router;
