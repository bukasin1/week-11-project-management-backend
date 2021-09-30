import { Router } from "express";
import { login, googleHandler, logout, redirect, redirectHandler, getFacebookAuth, authFacebook, localAuth } from '../controller/auth-controller';
const router = Router();


import { loginPage } from '../controller/authentication';

//LOGIN PAGE
router.post('/login', loginPage);
router.get('/login', login);
router.get('/google', googleHandler);
router.get('/logout', logout);
router.get('/google/redirect', redirectHandler, redirect);

router.get( "/facebook", getFacebookAuth() );

router.get( "/facebook/callback", authFacebook() );

export default router;
