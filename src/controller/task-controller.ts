/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const cloudinary = require('cloudinary').v2;
import taskModel, { iComment, ITask } from '../models/tasksSchema';
import { IUser } from '../models/userschema';
import projectModel, { IProject } from '../models/projectSchema';
import express, { Request, Response } from 'express';
import Task from '../models/tasksSchema';
import Project from '../models/projectSchema';

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

function makeComment(user: IUser, content: string){
  const newComment: iComment = {
    createdBy: {
      userId: user._id,
      userName: user.firstname as string + ' ' + user.lastname as string
    },
    content,
    createdOn: Date.now(),
  }
  return newComment
}

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
        assignedUser: req.body.assignedUser,
      });
      if(req.body.comment){
        const newComment = makeComment(loggedInUser, req.body.comment)
        task.comments.push(newComment)
      }
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

export async function updateTask(req: Request, res: Response){
  try{
    const loggedInUser = req.user as IUser;
    const taskId = req.params.taskID
    const task = await Task.findById(taskId) as ITask
    if(task){
      const {title, assignedUser, description, dueDate, status, comment} = req.body
      if(comment){
        const newComment = makeComment(loggedInUser, req.body.comment)
        task.comments.push(newComment)
      }
      if(req.file){
        console.log(req.file)
        const { url } = await cloudinary.uploader.upload(req.file?.path);
        const img_Url = url
        task.files.push({fileUrl: img_Url})
      }
      console.log(title, 'title update')
      task.title = title || task.title
      task.assignedUser = assignedUser || task.assignedUser
      task.description = description || task.description
      task.dueDate = dueDate || task.dueDate
      task.status = status || task.status
      await task.save()
      return res.status(404).send({
        message: `Task with id ${task._id} updated`
      })
    }
    res.status(404).send({
      message: "Task not found"
    })
  }catch(err){
    console.log(err)
    res.status(500).send({
      error: err
    })
  }
}

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

export async function createComment(req: Request, res: Response){
  try{
    const loggedInUser = req.user as IUser;
    const taskId = req.params.taskID
    const task = await Task.findById(taskId) as ITask
    const projectId = task.projectID
    const project = await Project.findById(projectId) as IProject
    const isCollaborator = project.collaborators?.find(user => user.userId === loggedInUser._id)
    const isOwner = project.owner === loggedInUser._id
    if(isCollaborator || isOwner){
      const {comment} = req.body
      const newComment = makeComment(loggedInUser, req.body.comment)
      task.comments.push(newComment)
      await task.save()
      res.status(201).send({
        message: `Comment created`
      })
      return;
    }
    res.status(201).send({
      message: `You are not a collaborator on this project`
    })
  }catch(err){
    console.log(err)
    res.status(500).send({
      error: err,
    });
  }
}

export async function getComments(req: Request, res: Response){
  try{
    const taskId = req.params.taskID
    const task = await Task.findById(taskId) as ITask
    const comments = task.comments
    res.status(201).send({
      status: "Succesfull",
      comments
    })
    return;
  }catch(err){
    console.log(err)
    res.status(500).send({
      error: err,
    });
  }
}

export async function editComment(req: Request, res: Response){
  try{
    const loggedInUser = req.user as IUser;
    const taskId = req.params.taskID
    const commentId = req.params.commentID
    const task = await Task.findById(taskId) as ITask
    const comment = task.comments.find(comment => comment.id === commentId) as iComment
    const commentIndex = task.comments.findIndex(comment => comment.id === commentId)
    const {content, createdBy, createdOn, _id, id} = comment
    const editedComment = {
      ...{content, createdBy, createdOn, _id},
      content: req.body.comment || content,
      editedBy: {
        userId: loggedInUser._id,
        userName: loggedInUser.firstname as string + loggedInUser.lastname as string
      },
      updatedOn: Date.now()
    }
    task.comments[commentIndex] = editedComment
    await task.save()
    res.status(201).send({
      message: `Succesfull!, comment ${commentId} edited `
    })
  }catch(err){
    console.log(err)
    res.status(500).send({
      error: err,
    });
  }
}

export async function deleteComment(req: Request, res: Response) {
  try{
    const taskId = req.params.taskID
    const commentId = req.params.commentID
    const task = await Task.findById(taskId) as ITask
    const commentIndex = task.comments.findIndex(comment => comment.id === commentId)
    task.comments.splice(commentIndex, 1)
    await task.save()
    res.status(201).send({
      message: `Succesfull!, comment ${taskId} deleted `
    })
  }catch(err){
    console.log(err)
    res.status(500).send({
      error: err,
    });
  }
}

export { getAllTasks, deleteTask, getTaskByStatus };
