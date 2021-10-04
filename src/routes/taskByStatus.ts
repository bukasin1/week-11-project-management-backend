import { Router } from 'express';
const router = Router();
import {  getTaskByStatus } from '../controller/taskByStatus'

router.get('/getTaskByStatus/:status', getTaskByStatus);

export default router;
