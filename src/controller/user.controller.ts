import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/userschema';
import { validateUserSignUp } from '../utils/utils.validate';
import { sendSignUpmail } from '../sendemail/sendemail';

export const signUpUser = async (req: Request, res: Response) => {
  console.log('User', req.body);
  const { error } = validateUserSignUp(req.body);
  if (error) {
    return res.status(404).send(error.details[0].message);
  }
  const email = req.body.email;
  console.log('email', email);
  const user = await User.findOne({ email: email });
  console.log('saveduser', user);
  if (user) {
    return res.status(409).send(`user with ${email} exists already`);
  }
  const password = req.body.password;
  console.log('password', password);
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('hashedPassword', hashedPassword);

  const savedUser = await User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: hashedPassword,
  });

  const message = `
  <form action="http://localhost:3000/users/verify" method="post">
  <p>Thank you for signing up with Project App. Please click verify below to complete your sign up</p>
  <br />
  <button type="submit">VERIFY</button>
</form>
  `;
  const body = `<p>Thank you for signing up with Project App. Please click <a href="http://localhost:3000/users/verify"><strong>here</strong></a></p>`;
  sendSignUpmail(email, message);

  res.status(201).send(savedUser);
};

export const verifyUser = async (req: Request, res: Response) => {
  const emai = req.body.email;
  const verifiedUser = await User.findOneAndUpdate({ emai: emai }, { isVerified: true }, { new: true });
  res.send(verifiedUser);
};
