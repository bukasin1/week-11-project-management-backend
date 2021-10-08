import express from 'express';
const router = express.Router();
import { getAllTasks, deleteTask, getTaskByStatus } from '../controller/task-controller';
import { isLoggedIn } from '../middleware/auth-check';
import { projectAuth } from '../middleware/projectAuth';

router.get('/', isLoggedIn, getAllTasks);
router.get('/:projectID/:status',isLoggedIn, getTaskByStatus);
router.delete('/deletetask/:taskID', isLoggedIn, projectAuth, deleteTask);

export default router;
