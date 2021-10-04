import express from 'express';
import Task from '../models/tasksSchema'

export async function getTaskByStatus(req: express.Request, res: express.Response) {
 
    let taskStatus = await Task.findOne({
        status: req.params.status,
      });
      if (!taskStatus) {
        res
          .status(404)
          .send(` Task with Status "${req.params.status}" is not found `);
      } else {
        res.status(200).send(taskStatus);
      }
}