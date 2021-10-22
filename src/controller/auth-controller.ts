import { Request, Response, NextFunction } from "express";
import passport from "passport";
import loginSchema from '../validateJoi/joiAuth';
import User, { IUser } from '../models/userschema';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Task from "../models/tasksSchema";

const secretKey = process.env.TOKEN_KEY as string;

const login = async (req: Request, res: Response) => {
  res.status(403).json({
    msg: "Please login again"
  })
  // res.render("login");
};

export async function loginPage(req: Request, res: Response) {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const email = req.body.email;
    console.log('email', email);
    let regUser = await User.findOne({ email: email }).exec();

    console.log('registered user', regUser);
    if (regUser.password) {
      if (!regUser) return res.status(400).send('Invalid Email or Password');
      const validPassword = await bcrypt.compare(req.body.password, regUser.password);

      if (!validPassword) return res.status(400).send('Invalid Email or Password');
      const token = jwt.sign({ _id: regUser._id.toString() }, secretKey, { expiresIn: '72000000 seconds' });
      res.cookie('jwt', token);
      //res.status(200).send('You Have Been Login and Authenticated Successfully');
      // res.status(200).send({ regUser, token });
      res.redirect('/profile');
    } else {
      console.log('login error')
      return res.status(400).send('Invalid Email or Password');
      // res.redirect('/profile');
    }

  } catch (err) {
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

const redirectHandler = passport.authenticate('google', { failureRedirect: `${process.env.REACTURL}/login` });

//redirect after authentication
const redirect = async (req: Request, res: Response) => {
  // res.send(req.user);
  res.redirect('/profile');
};

export const getFacebookAuth = () => {
  return passport.authenticate("facebook", { scope: ['email'] })
}

export const authFacebook = () => {
  return passport.authenticate("facebook", {
    failureRedirect: `${process.env.REACTURL}/login`
  })
}

export const localAuth = () => {
  return passport.authenticate('local', {
    failureRedirect: '/auth/login'
  })
}

export async function loginRedirect(req: Request, res: Response) {
  try {
    const user = req.user as IUser
    const token = jwt.sign({ _id: user._id.toString() }, secretKey, { expiresIn: '72000000 seconds' });
    res.cookie('jwt', token);

    const closedTask = await Task.find({ assignedUser: user.id, status: 'done' });
    const todoTask = await Task.find({ assignedUser: user.id, status: 'todo' });
    const backLog = await Task.find({ assignedUser: user.id, status: 'backlog' });
    const openedTasks = [...todoTask, ...backLog];
    const closedTasks = [...closedTask];

    const {
      id,
      _id,
      firstname,
      lastname,
      email,
      gender,
      role,
      location,
      projects,
      teams,
      about,
      isVerified,
      avatar,
      facebookId,
      googleId,
      createdAt,
      updatedAt
    } = user

    const sendUser = {
      id,
      _id,
      firstname,
      lastname,
      email,
      gender,
      role,
      location,
      projects,
      teams,
      about,
      isVerified,
      avatar,
      facebookId,
      googleId,
      createdAt,
      updatedAt,
      openedTasks,
      closedTasks
    }

    res.status(200).send({
      msg: `Welcome ${user.firstname} ${user.lastname}`,
      user,
      sendUser,
      token
    })
  } catch (err) {

  }
}

export async function ssoRedirect(req: Request, res: Response) {
  try {
    const user = req.user as IUser
    const token = jwt.sign({ _id: user._id.toString() }, secretKey, { expiresIn: '72000000 seconds' });
    res.cookie('jwt', token);

    const closedTask = await Task.find({ assignedUser: user.id, status: 'done' });
    const todoTask = await Task.find({ assignedUser: user.id, status: 'todo' });
    const backLog = await Task.find({ assignedUser: user.id, status: 'backlog' });
    const openedTasks = [...todoTask, ...backLog];
    const closedTasks = [...closedTask];

    const {
      id,
      _id,
      firstname,
      lastname,
      email,
      gender,
      role,
      location,
      projects,
      teams,
      about,
      isVerified,
      avatar,
      facebookId,
      googleId,
      createdAt,
      updatedAt
    } = user

    const sendUser = {
      id,
      _id,
      firstname,
      lastname,
      email,
      gender,
      role,
      location,
      projects,
      teams,
      about,
      isVerified,
      avatar,
      facebookId,
      googleId,
      createdAt,
      updatedAt,
      openedTasks,
      closedTasks
    }

    res.redirect(`${process.env.REACTURL}/welcome/${token}~${JSON.stringify(sendUser)}`)
  } catch (err) {

  }
}

export { login, googleHandler, logout, redirect, redirectHandler };
