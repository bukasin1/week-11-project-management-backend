import { Router } from 'express';
import { getProjectsByUser } from '../controller/findProject.controller';
import authenticateJWT from '../authentication/auth';
import { isLoggedIn } from '../middleware/auth-check';
const router = Router();

router.route('').get(isLoggedIn, getProjectsByUser);
//.post(authenticateJWT, createTask);

export default router;
