import { Router } from 'express';

const router = Router();
import {  updateMembers } from '../controller/members';

//LOGIN PAGE
//router.post('/addMembers', addMembers);
router.put('/updateTeam/:teamID', updateMembers);

export default router;