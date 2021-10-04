import { Router, Request, Response } from 'express';
const router = Router();

/* GET home page. */
router.get('/', function (req: Request, res: Response) {
  if(req.isAuthenticated()) return res.redirect('/profile')
  res.render('index', { title: 'Express' });
});

export default router;
