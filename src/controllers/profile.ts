// import {User, IUser}from '../models/userschema';
const User = require('../models/userschema')
import {Request, Response, NextFunction} from 'express'
import {createActivationToken} from '../utils/Auth';
const cloudinary = require('cloudinary').v2


export async function Profile(req: Request, res: Response): Promise<void> {
  let id = req.params.id
  let img_Url
  if(req.file){
    const {url} = await cloudinary.uploader.upload(req.file?.path);
    console.log("url",url)
    img_Url =url
}else{
  const user= await User.findById(id) as unknown as {[key:string]:string | boolean}
  console.log(user)
  img_Url = user.avatar
}
     const newUser = User.findByIdAndUpdate(id,{
       firstname:req.body.firstname,
       lastname:req.body.lastname,
       gender:req.body.gender,
       role:req.body.role,
       location:req.body.location,
       teams:req.body.teams,
       about:req.body.about,
       avatar:img_Url
     },(err:any)=>{
      if(err){
        res.status(404).json({
          message:err.message,
          type:"fail"
        })
      }else{
        res.status(201).json({
        message:"Profile updated successfully!"
        })
      }
     })
}


// const { CLIENT_URL }  = process.env
// export const Profile = async(req: Request, res: Response, next: NextFunction) => {

//   let img_url
//   if(req.file){
//     const {url} = await cloudinary.uploader.upload(req.file?.path);
//     img_url = url
//   }
//     const id = req.params.id
//     const newData = req.body;
//     const user =  await User.findById(id);
//     const activate_token = createActivationToken({user})

//   if(!user){
//     return res.status(404).json({
//       status: 404,
//       message: "User not found"
//     })
//   }
//     // const allowedMimes = ["image/jpeg", "image/pjpeg", "image/png"];

//     user.firstname = newData.firstname;
//     user.lastname = newData. lastname;
//     user.role = newData.role;
//     user.gender = newData.gender;
//     user.location = newData.location;
//     user.teams = newData.teams;
//     user.about = newData.about;
//     user.avatar = img_url;
//     res.status(201).json({
//       status: 200,
//       message: "Details updated succesfully"
//     })

//     user.save()
//   }

// export const create = async (req: Request, res: Response, next: NextFunction)=>{
//   const user =  new User({
//     firstname: req.body.firstname,
//     lastname: req.body.lastname,
//     role: req.body.role,
//     gender: req.body.gender,
//     location: req.body.location,
//     teams: req.body.teams,
//     about: req.body.about
//   })
//   res.send(user)
// }



