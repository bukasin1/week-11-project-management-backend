import express, { NextFunction, Request, Response } from "express";
import passport from "passport";
import { isLoggedIn } from "../middleware";
import { authFacebook, getFacebookAuth } from "../services/passport";
import { userType } from "../controllers/passportconfiguration";
require("../controllers/passportconfiguration")


const facebookRouter = express.Router();

facebookRouter.get( "/auth/facebook", getFacebookAuth() );

facebookRouter.get( "/auth/facebook/callback", authFacebook() );

facebookRouter.get("/fail", (req, res) => {
  res.send("Failed attempt");
});

// type extended = Request & userType;
facebookRouter.get("/dashboard", isLoggedIn, function(req: Request, res: Response){
  const user: userType = req.user as userType
  console.log(user, "profile user")
  res.send(`Welcome ${user.firstname}! <a href="/logout">Logout</a>`);
});

facebookRouter.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

export default facebookRouter;
