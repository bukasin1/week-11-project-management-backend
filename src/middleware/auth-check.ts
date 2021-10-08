/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userschema';

export const authCheck = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.redirect('/auth/login');
  } else {
    next();
  }
};

const secretKey = process.env.TOKEN_KEY as string;

export async function isLoggedIn(req: Request, res: Response, next: NextFunction): Promise<void> {
  if (req.cookies.jwt) {
    const token: string = req.cookies.jwt;
    if (!token) res.status(401).send('Access denied. No token provided.');

    try {
      const decoded: any = jwt.verify(token, secretKey);
      const user = await User.findOne({ _id: decoded._id });
      req.user = user;
      next();
    } catch (ex) {
      res.status(400).send({ error: 'please you have to be Authenticated' });
    }
    return;
  }

  // if user is authenticated in the session, carry on
  if (req.user === 'Non') {
    req.flash('error_message', 'Email already exists');
    return res.redirect('/auth/login');
  }
  if (req.isAuthenticated()) return next();
  // if they aren't redirect them to the home page
  res.redirect('/auth/login');
}

// export default authCheck;
