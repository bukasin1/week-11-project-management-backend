import { Request, Response } from "express";
import Project from "../models/projectSchema";
import { IUser } from "../models/userschema";

export async function createProject(req: Request, res: Response){
  try{
    const loggedUser = req.user as IUser
    const project = await Project.create({
      owner: loggedUser._id,
      projectName: req.body.projectName
    })
    res.status(201).send(project)
  }catch(err){
    console.log(err)
  }
}
