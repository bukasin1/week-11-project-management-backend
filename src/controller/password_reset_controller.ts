import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import User from '../models/userschema';
import { sendSignUpmail } from '../sendemail/sendemail';
import jwt, { JwtPayload } from 'jsonwebtoken';

export async function changePassword(req: any, res: Response) {
  const user = req.user;
  const { email, oldPassword, newPassword } = req.body;
  console.log(email);

  //const validUser = await bcrypt.compare( oldPassword, req.user.password)
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const newUserInfo = await User.findOneAndUpdate({ email: email }, { password: hashedPassword }, { new: true });
  res.status(200).json({ newUserInfo });
}

export async function forgetPassword(req: Request, res: Response) {
  try {
    const { email } = req.body;
    console.log(email);
    const user = await User.findOne({ email: email });
    console.log(user);
    if (user) {
      let secret = process.env.SECRET_KEY_AUTH as string;
      const token = jwt.sign({ id: user._id }, secret, { expiresIn: '30mins' });
      const link = `http://localhost:3000/password/verifyresetpassword/${token}`;
      const body = `
      Dear ${user.firstname},
      <p>Follow this <a href=${link}> link </a> to change your password. The link would expire in 30 mins.</P>
            `;
      sendSignUpmail(email, body);
      res.status(200).json({
        message: 'Link sent to your mail.',
        link: link,
      });
    } else {
      res.status(400).json({
        message: 'Wrong email provided',
      });
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: 'Route crashed',
    });
  }
}
export async function verifyResetPassword(req: Request, res: Response) {
  //get
  let { token } = req.params;
  console.log(token, 'token-verify');
  let secret = process.env.SECRET_KEY_AUTH as string;
  const verification = (await jwt.verify(token, secret)) as JwtPayload; ///verification
  console.log(verification, 'verification');
  const id = verification.id;
  const isValidId = User.findOne({ _id: id });
  try {
    if (isValidId) {
      //line missing?
      // token = jwt.sign({ id: id }, secret, { expiresIn: '1d' });
      res.render('password-rest', { title: 'password-rest', token: token });
    }
  } catch (err) {
    res.json({
      message: err,
    });
  }
}

export async function resetPassword(req: Request, res: Response) {
  //post
  console.log(req.params);
  const token = req.params.token;
  console.log('token-reset', token);
  try {
    // res.json(req.params)
    let secret = process.env.SECRET_KEY_AUTH as string;
    console.log('secret', secret);
    const verification = (await jwt.verify(token, secret)) as JwtPayload;
    console.log('verification', verification);
    const id = verification.id;
    if (verification) {
      const user = await User.findOne({ _id: id });
      console.log('user', user);
      if (user) {
        let { newPassword, repeatPassword } = req.body;
        if (newPassword === repeatPassword) {
          newPassword = await bcrypt.hash(newPassword, 10);
          console.log('newPassword', newPassword);
          const updatedUser = await User.findOneAndUpdate({ _id: id }, { password: newPassword }, { new: true });
          console.log('updatedUser', updatedUser);
          res.status(400).json({
            updatedUser: updatedUser,
          });
          return;
        } else {
          res.status(400).json({
            message: "newpassword and repeatpassword don't match",
          });
          return;
        }
      } else {
        res.status(400).json({
          message: 'user does not exist',
        });
        return;
      }
    } else {
      res.status(400).json({
        message: 'verification error',
      });
      return;
    }
  } catch (err: any) {
    res.status(400).json({
      message: 'This is the catch block message',
      // message: "Catch block",
      error: err.message,
    });
    return;
  }
}
