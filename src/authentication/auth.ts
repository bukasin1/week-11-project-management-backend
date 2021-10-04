import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const accessTokenSecrete = 'youraccesstokensecret';
const authenticateJWT = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];

    // jwt.verify(token, accessTokenSecrete, (err: any, user: any) => {
    //   if (err) {
    //     return res.sendStatus(403);
    //   }
    //   req.user = user;
    //   console.log(user);
    //   next();
    // });

    const decoded = jwt.verify(token, accessTokenSecrete);
    req.user = decoded;
    console.log(decoded);
    next();
  } else {
    res.sendStatus(401);
  }
};
export default authenticateJWT;
