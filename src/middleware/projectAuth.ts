import { NextFunction, Request, Response } from "express";
import { IUser } from "../models/userschema";
import Project, { IProject } from "../models/projectSchema";

export async function projectAuth(req: Request, res: Response, next: NextFunction){
  try{
    const loggedUser = req.user as IUser
    const project = await Project.findById(req.params.projectID)
    if(loggedUser._id?.toString() === project.owner){
      next()
    }
    res.status(200).json({
      message: 'You are not the owner of the project'
    });
  }catch(err){
    console.log(err)
    res.send(err)
  }
}
