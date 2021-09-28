import { Request, Response, NextFunction } from "express";
import passport from "passport";

const login = async (req: Request, res: Response) => {
  res.render("login");
};

const googleHandler = passport.authenticate("google", {
  scope: ["profile", "email"],
});

const logout = async (req: Request, res: Response) => {
  //passport handles logout
  req.logout();
  req.session = null;
  res.redirect('/');
};

const redirectHandler = passport.authenticate('google');

//redirect after authentication
const redirect = async (req: Request, res: Response) => {
  // res.send(req.user);
  res.redirect('/profile');
};

export const getFacebookAuth = () => {
  return passport.authenticate("facebook", {scope: ['email'] })
}

export const authFacebook = () => {
  return passport.authenticate("facebook", {
    successRedirect: "/profile",
    failureRedirect: "/"
  })
}

export { login, googleHandler, logout, redirect, redirectHandler };
