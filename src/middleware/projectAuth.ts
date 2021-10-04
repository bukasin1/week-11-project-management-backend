import { NextFunction, Request, Response } from "express";
import { IUser } from "../models/userschema";
import Project, { IProject } from "../models/projectSchema";
import Task from "../models/tasksSchema";

export async function projectAuth(req: Request, res: Response, next: NextFunction){
  try{
    const loggedUser = req.user as IUser
    let ownerId
    const {taskID, projectID} = req.params
    if(projectID){
      const project = await Project.findById(projectID)
      ownerId = project.owner
    }
    if(taskID){
      const task = await Task.findById(taskID)
      ownerId = task.owner
    }
    if(loggedUser._id?.toString() === ownerId){
      next()
      return;
    }
    res.status(200).json({
      message: 'You are not the owner of the project'
    });
    return;
  }catch(err){
    console.log(err)
    res.send(err)
  }
}
