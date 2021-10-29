import { NextFunction, Request, Response } from 'express';
import { IUser } from '../models/userschema';
import Project, { IProject } from '../models/projectSchema';
import Task, { iComment, ITask } from '../models/tasksSchema';
import Team from '../models/teamsSchema';

export async function projectAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const loggedUser = req.user as IUser;
    let ownerId;
    const { taskID, projectID, teamID, commentID } = req.params;
    if(commentID){
      const commentId = req.params.commentID
      const task = await Task.findById(taskID) as ITask
      const comment = task.comments.find(comment => comment.id === commentId) as iComment
      if(comment){
        ownerId = comment.createdBy.userId
        if (loggedUser._id?.toString() === ownerId) {
          next();
          return;
        }
        res.status(404).json({
          message: 'You did not create this comment and therefore are not authorized to edit/delete it',
        });
        return;
      }
      res.status(404).json({
        message: 'Comment not found',
      });
      return;
    }
    if (projectID) {
      const project = await Project.findById(projectID);
      ownerId = project.owner;
    }
    if (taskID) {
      const task = await Task.findById(taskID);
      ownerId = task.owner;
    }
    if (teamID) {
      const team = await Team.findById(teamID);
      ownerId = team.owner;
    }
    if (loggedUser._id?.toString() === ownerId) {
      next();
      return;
    }
    res.status(404).json({
      message: 'You are not the owner of the project',
    });
    return;
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: 'You are not the owner of the project',
    });
  }
}
