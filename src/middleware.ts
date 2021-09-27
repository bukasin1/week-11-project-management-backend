import express, { NextFunction, Request, Response } from "express";
// route middleware to make sure
export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  console.log("check isLoggedIn", req.isAuthenticated())
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
      return next();
  // if they aren't redirect them to the home page
  res.redirect('/');
}
