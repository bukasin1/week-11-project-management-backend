import { Request, Response, NextFunction, Express } from 'express';
import { userType } from '../config/passport-config';

const showProfile = (req: Request, res: Response) => {
  const user = req.user as userType;
  res.render('profile', { user: user.firstname });
};

export { showProfile };
