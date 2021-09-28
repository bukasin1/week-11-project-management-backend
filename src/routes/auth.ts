/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';

const router = Router();
import { loginPage } from '../controller/authentication';

//LOGIN PAGE
router.post('/login', loginPage);

export default router;
