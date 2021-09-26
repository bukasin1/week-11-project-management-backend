import { Request, Response, NextFunction } from "express";
import passport from "passport";

const login = async (req: Request, res: Response) => {
  res.render("login");
};

const googleHandler = passport.authenticate("google", {
  scope: ["profile"],
});

const logout = async (req: Request, res: Response) => {
  //passport handles logout
  res.send("logging out of app");
};

export { login, googleHandler, logout };
