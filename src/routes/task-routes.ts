import express from 'express';
const app = express();
const router = express.Router();
import { getAllTasks, deleteTask } from '../controller/task-controller';
import { authCheck, isLoggedIn } from '../middleware/auth-check';

router.get('/', isLoggedIn, getAllTasks);
router.get('/deletetask/:id', isLoggedIn, deleteTask);

export default router;
