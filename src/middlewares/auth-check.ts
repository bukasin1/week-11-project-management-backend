import { Request, Response, NextFunction } from 'express';

export const authCheck = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.redirect('/auth/login');
  } else {
    next();
  }
};

export function isLoggedIn(req: Request, res: Response, next: NextFunction):void {
  // if user is authenticated in the session, carry on
  console.log(req.user, "auth check")
  if (req.isAuthenticated() && req.user !== "Non")
      return next();
  // if they aren't redirect them to the home page
  if(req.user === "Non") {
    req.flash("error_message", "Email already exists")
    return res.redirect('/auth/login');
  }
  res.redirect('/auth/login');

}

// export default authCheck;
