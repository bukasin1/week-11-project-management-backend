// import {User, IUser}from '../models/userschema';
import User from '../models/userschema';
import { Request, Response, NextFunction } from 'express'
import { createActivationToken } from '../utils/Auth';
const cloudinary = require('cloudinary').v2


export async function Profile(req: Request, res: Response): Promise<void> {
  let id = req.params.id
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
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    gender: req.body.gender,
    role: req.body.role,
    location: req.body.location,
    teams: req.body.teams,
    about: req.body.about,
    avatar: img_Url
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


export const create = async (req: Request, res: Response, next: NextFunction) => {
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    role: req.body.role,
    gender: req.body.gender,
    location: req.body.location,
    teams: req.body.teams,
    about: req.body.about
  })
  const result = await user.save()
  res.send(result)
}



