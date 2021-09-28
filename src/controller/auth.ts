/* eslint-disable no-console */
/* eslint-disable prefer-const */
import bcrypt from 'bcryptjs';
import express from 'express';
import User from '../models/userschema';
import loginSchema from '../validateJoi/joiAuth';
import jwt from 'jsonwebtoken';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import dotenv from 'dotenv';
dotenv.config();
const secretKey = process.env.TOKEN_KEY as string;
// TO LOGIN USER
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function loginPage(req: express.Request, res: express.Response) {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const email = req.body.email;
  console.log('email', email);
  let regUser = await User.findOne({ email: email }).exec();

  console.log('registered user', regUser);

  if (!regUser) return res.status(400).send('Invalid Email or Password');
  const validPassword = await bcrypt.compare(req.body.password, regUser.password);

  if (!validPassword) return res.status(400).send('Invalid Email or Password');
  const token = jwt.sign({ _id: regUser._id.toString() }, secretKey, { expiresIn: '3600 seconds' });
  res.cookie('jwt', token);
  res.status(200).send('You Have Been Login and Authenticated Successfully');
  //res.status(200).send({ regUser, token });
}
