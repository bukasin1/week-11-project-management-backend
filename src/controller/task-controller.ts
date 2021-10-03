import taskModel from '../models/tasksSchema';
import userModel, { IUser } from '../models/userschema';
import projectModel from '../models/projectSchema';

import { Request, Response } from 'express';

const getAllTasks = async (req: Request, res: Response) => {
  try {
    const loggedUser: IUser = req.user as IUser;
    const task = await taskModel.find({ assignedUser: loggedUser._id });
    res.status(201).send(task);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: err,
    });
  }
};

const deleteTask = async (req: Request, res: Response) => {
  try {
    //get the task that wants to be deleted
    const taskId = req.params.id;
    const task = taskModel.findOne({ _id: taskId });
    const taskProjectId = task.projectID;
    const taskProject = projectModel.findOne({ _id: taskProjectId });
    const loggedUser: IUser = req.user as IUser;
    const isOwner = taskProject.owner === loggedUser._id;
    if (!isOwner) {
      return res.status(401).json({
        msg: 'Sorry you are not the owner of the project. you cant perform this operation',
      });
    }
    const deletedTask = taskModel.findOneAndDelete({ _id: taskId });
    res.status(201).send(deletedTask);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: err,
    });
  }
};

export { getAllTasks, deleteTask };
