import express from 'express';
const router = express.Router();
import {
  getAllTasks,
  deleteTask,
  getTaskByStatus,
  createComment,
  getComments,
  editComment,
  deleteComment,
  getTaskByProject,
} from '../controller/task-controller';
import { isLoggedIn } from '../middleware/auth-check';
import { projectAuth } from '../middleware/projectAuth';

router.get('/', isLoggedIn, getAllTasks);
router.get('/:projectID/:status', isLoggedIn, getTaskByStatus);
router.get('/:projectID', isLoggedIn, getTaskByProject);
router.delete('/deletetask/:taskID', isLoggedIn, projectAuth, deleteTask);

router.post('/:taskID/create-comment', isLoggedIn, createComment)
router.get('/get/:taskID/comments', isLoggedIn, getComments)
router.put('/:taskID/:commentID/edit-comment', isLoggedIn, projectAuth, editComment)
router.delete('/:taskID/:commentID/deletecomment', isLoggedIn, projectAuth, deleteComment)

export default router;
