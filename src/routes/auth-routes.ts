import { Router } from "express";
import { login, googleHandler, logout, redirect, redirectHandler } from '../controllers/auth-controller';
const router = Router();

router.get('/login', login);
router.get('/google', googleHandler);
router.get('/logout', logout);
router.get('/google/redirect', redirectHandler, redirect);

export default router;
