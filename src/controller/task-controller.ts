/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const cloudinary = require('cloudinary').v2;
import taskModel from '../models/tasksSchema';
import { IUser } from '../models/userschema';
import projectModel from '../models/projectSchema';
import express, { Request, Response } from 'express';
import Task from '../models/tasksSchema';

const getAllTasks = async (req: Request, res: Response) => {
  try {
    const loggedUser: IUser = req.user as IUser;
    const task = await taskModel.find({ assignedUser: loggedUser._id });
    res.status(201).send(task);
  } catch (err) {
    res.status(500).send({
      error: err,
    });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    let img_Url;
    const loggedInUser = req.user as IUser;
    const projectID = req.params.projectID;
    const project = await projectModel.findById(projectID);
    if (loggedInUser._id?.toString() === project.owner) {
      const projectID = req.params.projectID;
      const task = new Task({
        projectID,
        owner: project.owner,
        title: req.body.title,
        description: req.body.description,
        comments: req.body.comments,
        assignedUser: req.body.assignedUser,
      });
      if (req.file) {
        const { url } = await cloudinary.uploader.upload(req.file?.path);
        img_Url = url;
        task.files.push({ fileUrl: img_Url });
      }
      const result = await task.save();
      return res.send(result);
    }
    res.send('This user cannot create task on the project');
  } catch (err) {
    res.send(err);
  }
};
async function getTaskByStatus(req: express.Request, res: express.Response) {
  const taskStatus = await taskModel.find({
    projectID: req.params.projectID,
    status: req.params.status,
  });
  if (taskStatus.length === 0) {
    res.status(404).send(` No Tasks with Status "${req.params.status}" found `);
  } else {
    res.status(200).send(taskStatus);
  }
}

const deleteTask = async (req: Request, res: Response) => {
  try {
    //get the task that wants to be deleted
    const taskId = req.params.taskID;
    const task = await taskModel.findOne({ _id: taskId });
    const taskProjectId = task.projectID;
    const taskProject = await projectModel.findOne({ _id: taskProjectId });
    const loggedUser: IUser = req.user as IUser;
    const isOwner = taskProject.owner === loggedUser._id;
    if (!isOwner) {
      return res.status(401).json({
        msg: 'Sorry you are not the owner of the project. you cant perform this operation',
      });
    }
    const deletedTask = await taskModel.findOneAndDelete({ _id: taskId });
    res.status(201).send(deletedTask);
  } catch (err) {
    res.status(500).send({
      error: err,
    });
  }
};

// export const deleteTask = async(req: Request, res: Response, next: NextFunction) =>{
//   const {id} = req.body
//   const ID = req.params.id
//    const value = result.filter((id)=> id !== ID)
//    res.send('value deleted succesfully')

// }

export { getAllTasks, deleteTask, getTaskByStatus };
