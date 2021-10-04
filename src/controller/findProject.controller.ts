import { Request, Response } from 'express';
import { IUser } from '../models/userschema';
import Project from '../models/projectSchema';

export const getProjectsByUser = async (req: Request, res: Response) => {
  const loggedIn = req.user as IUser;
  const project = await Project.find({ owner: loggedIn._id });
  const id = loggedIn._id;
  console.log('current user', id);
  res.status(200).send(project);
};
