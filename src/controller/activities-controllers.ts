import { Request, Response } from 'express';
import User from '../models/userschema';
import Task from '../models/tasksSchema';
import { IUser } from '../models/userschema';
import { ITask } from '../models/tasksSchema';
export const getActivities = async (req: Request, res: Response) => {
  const loggedInUser = req.user as IUser;
  const user = await User.findById(loggedInUser._id);
  const userProjects = user.projects;
  const projectIds = userProjects.map((value: any) => value.projectId);
  const userTasks = await Task.find({ projectID: { $in: projectIds } });
  const findTodayTask = userTasks.filter(
    (task: ITask) => task.updatedAt.toISOString().split('T')[0] === new Date().toISOString().split('T')[0],
  );

  return res.status(200).send(findTodayTask);
};

export const getYesterdayActivities = async (req: Request, res: Response) => {
  const loggedInUser = req.user as IUser;
  const user = await User.findById(loggedInUser._id);
  const userProjects = user.projects;
  const projectIds = userProjects.map((value: any) => value.projectId);
  const userTasks = await Task.find({ projectID: { $in: projectIds } });
  const findYesterdayTask = userTasks.filter(
    (task: ITask) =>
      task.updatedAt.toISOString().split('T')[0] ===
      new Date(new Date().valueOf() - 1000 * 60 * 60 * 24).toISOString().split('T')[0],
  );
  return res.status(200).send(findYesterdayTask);
};
