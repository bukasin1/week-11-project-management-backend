import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/userschema';
import { validateUserSignUp } from '../utils/utils.validate';
import { sendSignUpmail } from '../sendemail/sendemail';

export const signUpUser = async (req: Request, res: Response) => {
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
  <form action="http://localhost:3000/users/verify/${email}" method="post">
  <p>Thank you for signing up with Project App. Please click verify below to complete your sign up</p>
  <br />
  <button type="submit">VERIFY</button>
</form>
  `;

  sendSignUpmail(email, message);
  res.status(201).send(savedUser);
};

export const verifyUser = async (req: Request, res: Response) => {
  const email = req.params.id;
  const verifiedUser = await User.findOneAndUpdate({ email: email }, { isVerified: true }, { new: true });
  res.status(200).send(verifiedUser);
};
