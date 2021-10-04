import express from 'express';
const app = express();
const router = express.Router();
import { getAllTasks, deleteTask } from '../controller/task-controller';
import { authCheck, isLoggedIn } from '../middleware/auth-check';
import {  getTaskByStatus } from '../controller/taskByStatus'


router.get('/', isLoggedIn, getAllTasks);
router.get('/:status', getTaskByStatus);
router.get('/deletetask/:id', isLoggedIn, deleteTask);

export default router;
