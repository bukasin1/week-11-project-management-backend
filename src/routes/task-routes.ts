import express from 'express';
const router = express.Router();
import { getAllTasks, deleteTask, getTaskByStatus } from '../controller/task-controller';
import { isLoggedIn } from '../middleware/auth-check';

router.get('/getTaskByStatus/:status', getTaskByStatus);
router.get('/', isLoggedIn, getAllTasks);
router.get('/:status', getTaskByStatus);
router.get('/deletetask/:id', isLoggedIn, deleteTask);

export default router;
