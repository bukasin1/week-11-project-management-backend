import { Router } from "express";
import { login, googleHandler, logout, redirect, redirectHandler, getFacebookAuth, authFacebook, localAuth, loginRedirect, ssoRedirect } from '../controller/auth-controller';
const router = Router();


import { loginPage } from '../controller/auth-controller';

//LOGIN PAGE
// router.post('/login', loginPage);
router.post('/login', localAuth(), loginRedirect);
router.get('/login', login);
router.get('/google', googleHandler );
router.get('/logout', logout);
router.get('/google/redirect', redirectHandler, ssoRedirect);

router.get( "/facebook", getFacebookAuth() );

router.get( "/facebook/callback", authFacebook(), ssoRedirect );

export default router;
