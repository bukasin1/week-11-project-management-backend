import { Request, Response, NextFunction } from "express";
import passport from "passport";
import loginSchema from '../validateJoi/joiAuth';
import User from '../models/userschema';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const secretKey = process.env.TOKEN_KEY as string;

const login = async (req: Request, res: Response) => {
  res.render("login");
};

export async function loginPage(req: Request, res: Response) {
  try{
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const email = req.body.email;
    console.log('email', email);
    let regUser = await User.findOne({ email: email }).exec();

    console.log('registered user', regUser);
    if(regUser.password){
      if (!regUser) return res.status(400).send('Invalid Email or Password');
      const validPassword = await bcrypt.compare(req.body.password, regUser.password);

      if (!validPassword) return res.status(400).send('Invalid Email or Password');
      const token = jwt.sign({ _id: regUser._id.toString() }, secretKey, { expiresIn: '3600 seconds' });
      res.cookie('jwt', token);
      //res.status(200).send('You Have Been Login and Authenticated Successfully');
      // res.status(200).send({ regUser, token });
      res.redirect('/profile');
    }else{
      console.log('login error')
      return res.status(400).send('Invalid Email or Password');
      // res.redirect('/profile');
    }

  }catch(err){
    console.log(err)
    res.status(401).send({
      error: "Server error"
    })
  }

}

const googleHandler = passport.authenticate("google", {
  scope: ["profile", "email"],
});

const logout = async (req: Request, res: Response) => {
  //passport handles logout
  req.logout();
  req.session = null;
  res.clearCookie('jwt')
  res.redirect('/');
};

const redirectHandler = passport.authenticate('google', {failureRedirect: "/auth/login"});

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
    failureRedirect: "/auth/login"
  })
}

export const localAuth = () => {
  return  passport.authenticate('local', {
    failureRedirect: '/auth/login',
    successRedirect: "/profile"
  })
}

export { login, googleHandler, logout, redirect, redirectHandler };
