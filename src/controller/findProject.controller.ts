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

export const updateProjectByOwner = async (req: Request, res: Response) => {
  const loggedIn = req.user as IUser;
  const id = req.params.projectID;
  console.log('id', id);
  const newName = req.body.projectName;
  console.log('newName', newName);
  try {
    const updatedProject = await Project.findOneAndUpdate({ _id: id }, { projectName: newName }, { new: true });
    res.status(201).send(updatedProject);
  } catch (error) {
    res.status(500).send(error);
  }
};
