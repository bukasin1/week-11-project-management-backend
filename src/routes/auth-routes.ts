import { Router } from "express";
import { login, googleHandler, logout } from "../controllers/auth-controller";
const router = Router();

router.get("/login", login);
router.get("/google", googleHandler);
router.get("/logout", logout);

export default router;
