import Task from '../models/tasksSchema';
import Project from '../models/projectSchema';
import {Request, Response, NextFunction} from 'express';
import { IUser } from '../models/userschema';
const cloudinary = require('cloudinary').v2


export const createTask = async(req: Request, res: Response, next: NextFunction) =>{
  try{
    let img_Url
    const loggedInUser = req.user as IUser
    const projectId = req.params.projectId
    const project = await Project.findById(projectId)
    if(loggedInUser._id?.toString() === project.owner){
      const projectID = req.params.projectId
      const task = new Task({
        projectID,
        owner: project.owner,
        title: req.body.title,
        description: req.body.description,
        comments: req.body.comments,
        assignedUser: req.body.assignedUser
      })
      console.log(req.file)
      if (req.file) {
        const { url } = await cloudinary.uploader.upload(req.file?.path);
        img_Url = url
        task.files.push({fileUrl: img_Url})
      }
      const result = await task.save()
      return res.send(result)
    }
    res.send("This user cannot create task on the project")
  }catch(err){
    console.log(err)
    res.send(err)
  }
}

// export const deleteTask = async(req: Request, res: Response, next: NextFunction) =>{
//   const {id} = req.body
//   const ID = req.params.id
//    const value = result.filter((id)=> id !== ID)
//    res.send('value deleted succesfully')

// }


