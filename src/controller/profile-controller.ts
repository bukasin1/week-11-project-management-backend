// import {User, IUser}from '../models/userschema';
import User from '../models/userschema';
import { IUser } from '../models/userschema';
import { Request, Response, NextFunction } from 'express'
import { createActivationToken } from '../utils/Auth';
const cloudinary = require('cloudinary').v2

import { userType } from '../config/passport-config';

const showProfile = (req: Request, res: Response) => {
  const user = req.user as userType;
  res.render('profile', { user: user.firstname });
};

export { showProfile };

export async function editProfile(req: Request, res: Response): Promise<void> {
  const loggedUser = req.user as IUser
  // let id = req.params.id
  let id = loggedUser._id
  const user = await User.findById(id) as IUser
  let img_Url
  if (req.file) {
    const { url } = await cloudinary.uploader.upload(req.file?.path);
    console.log("url", url)
    img_Url = url
  } else {
    const user = await User.findById(id) as unknown as { [key: string]: string | boolean }
    console.log(user)
    img_Url = user.avatar
  }
  const newUser = User.findByIdAndUpdate(id, {
    firstname: req.body.firstname || user.firstname,
    lastname: req.body.lastname || user.lastname,
    gender: req.body.gender || user.gender,
    role: req.body.role || user.role,
    location: req.body.location || user.location,
    teams: req.body.teams || user.teams,
    about: req.body.about || user.about,
    avatar: img_Url || user.avater
  }, (err: any) => {
    if (err) {
      res.status(404).json({
        message: err.message,
        type: "fail"
      })
    } else {
      res.status(201).json({
        message: "Profile updated successfully!"
      })
    }
  })
}



