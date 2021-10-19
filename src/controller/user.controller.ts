import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/userschema';
import { validateUserSignUp } from '../utils/utils.validate';
import { sendSignUpmail } from '../sendemail/sendemail';
const cloudinary = require('cloudinary').v2

export const signUpUser = async (req: Request, res: Response) => {
  try{
    const { error } = validateUserSignUp(req.body);
    if (error) {
      return res.status(404).send(error.details[0].message);
    }
    const email = req.body.email;
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(409).send(`user with ${email} exists already`);
    }

    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);

    const savedUser = await User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedPassword,
    });

    const message = `
    <p>Thank you for signing up with Project App. Please click verify below to complete your sign up</p>
    <br />
    <a href = "https://jaraaa.herokuapp.com/users/verify/${email}"><button type="submit">VERIFY</button></a>
    `;

    sendSignUpmail(email, message);
    res.status(201).send(savedUser);
  }catch(err){
    console.log(err)
  }
};

export const verifyUser = async (req: Request, res: Response) => {
  const email = req.params.id;
  const verifiedUser = await User.findOneAndUpdate({ email: email }, { isVerified: true }, { new: true });
  res.status(200).send(verifiedUser);
};
