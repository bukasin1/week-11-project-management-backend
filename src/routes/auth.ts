/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { request, Router } from "express";
import bcrypt from "bcryptjs";
const router = Router();
import { loginPage } from "../controller/auth";

//LOGIN PAGE
router.post("/login", loginPage);



export default router;
