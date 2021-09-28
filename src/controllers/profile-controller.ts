import { Request, Response, NextFunction, Express } from 'express';

type userProfile = Express.User & { userName: string };

const showProfile = (req: Request, res: Response) => {
  const user = req.user as userProfile;
  res.render('profile', { user: user.userName });
};

export { showProfile };
