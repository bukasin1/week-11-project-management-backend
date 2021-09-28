import bcrypt from 'bcrypt';
import express, { Request, Response} from "express"
// import User from "../models/userschema"
const User = require('../models/userschema')
import sendMailer from '../../nodemailer'
import jwt,{ JwtPayload} from 'jsonwebtoken'


export async function changePassword(req: any , res: Response){
  const user = req.user
  const { oldPassword, newPassword, repeatPassword } = req.body
  //validation of all input fields
  const id = req.user?.id
  try{
      const validUser = await bcrypt.compare( oldPassword, req.user.password)
      // console.log(validUser, "validUser")
      if(validUser){
          if(newPassword === repeatPassword){
              const newPasswordUpdate = await bcrypt.hash(newPassword, 10);
              const newUserInfo = await User.findByIdAndUpdate({_id:id}, {password: newPassword}, {new: true})
              res.status(200).json({
                  newUserInfo
              })
              return ;
          }else{
            res.status(404).json({
              message: "Password and repeat password does not match"
          })
            return;
          }
        }
        else{
            res.status(404).json({
                message: "Wrong Old password"
            })
            return;
        }
        return res.json(req.body)
    }
    catch(err: any){
        // console.log(err)
        res.status(400).json({
            error: err
        })
        return ;
    }
}


export async function forgetPassword(req: Request, res: Response){
  try{
    const { email } = req.body
    console.log(email)
    const user = await User.findOne({ email: email })
    console.log(user)
    // console.log(user)
    if(user){
      let secret = process.env.SECRET_KEY as string
      const token = jwt.sign({ id: user._id}, secret, { expiresIn: '30mins' });
      const link = `http://localhost:5009/users/password/resetPassword/${token}`
      // console.log(link)
      // console.log(token)
      //the variables for the nodemailer
      const body = `
      Dear ${user.fullname},
      <p>Follow this <a href=${link}> link </a> to change your password. The link would expire in 30 mins.</P>
            `
      sendMailer(email, body)
      res.status(200).json({
        message: "Link sent to your mail.",
        link: link
    })
  }else{
    res.status(400).json({
      message: "Wrong email provided"
  })
    return ;
  }
}catch(err){
  console.log(err)
  res.status(404).json({
    message: "Route crashed"
 })
}
}
export async function verifyResetPassword(req: Request, res: Response){ //get
  let { token } = req.params
  console.log(token, "token-verify")
  let secret = process.env.SECRET_KEY as string
  const verification = await jwt.verify(token, secret) as JwtPayload///verification
  console.log(verification, "verification")
  const id = verification.id
  const isValidId = User.findOne({_id: id})
  try{
    if(isValidId){
      //line missing?
      token = jwt.sign({id: id}, secret, { expiresIn: '1d' })
      res.render("reset-password", { title: "Reset-Password",
    token: token})
    }
  }catch(err){
    res.json({
      message: err
    })
  }
}
export async function resetPassword (req: Request, res: Response){ //post
  const { token } = req.params
  console.log(token, "token-reset")
  try{
    // res.json(req.params)
    let secret = process.env.SECRET_KEY as string
    const verification = await jwt.verify(token, secret) as JwtPayload
    const id = verification.id
    if(verification){
      const user = await User.findOne({ _id: id })
        if(user){
          let { newPassword, repeatPassword } = req.body
          if( newPassword === repeatPassword){
            newPassword = await bcrypt.hash(newPassword, 10);
            const updatedUser = await User.findOneAndUpdate({ _id: id }, {password: newPassword}, {new: true})
            res.status(400).json({
              updatedUser: updatedUser
            })
            return ;
          }else{
            res.status(400).json({
              message: "newpassword and repeatpassword don't match"
            })
            return ;
          }
        }else{
          res.status(400).json({
            message: "user does not exist"
          })
          return ;
        }
      }
      else{
      res.status(400).json({
          message: "verification error"
      })
        return ;
    }
  }catch(err: any){
    res.status(400).json({
      message: "This is the catch block message",
      // message: "Catch block",
      error: err.message
    })
    return ;
  }
}
