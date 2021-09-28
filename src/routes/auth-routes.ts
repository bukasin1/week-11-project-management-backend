import { Router } from "express";
import { login, googleHandler, logout, redirect, redirectHandler, getFacebookAuth, authFacebook } from '../controllers/auth-controller';
const router = Router();

router.get('/login', login);
router.get('/google', googleHandler);
router.get('/logout', logout);
router.get('/google/redirect', redirectHandler, redirect);

router.get( "/facebook", getFacebookAuth() );

router.get( "/facebook/callback", authFacebook() );

export default router;
