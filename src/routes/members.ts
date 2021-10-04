import { Router } from 'express';

const router = Router();
import {  updateMembers } from '../controller/members';
import {projectAuth} from '../middleware/projectAuth'

//LOGIN PAGE
//router.post('/addMembers', addMembers);
router.put('/updateTeam/:teamID', projectAuth, updateMembers);

export default router;
