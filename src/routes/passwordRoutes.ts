import express from "express"
//import { changePassword } from "../controllers/password_reset_controller"
import {changePassword,resetPassword,verifyResetPassword, forgetPassword} from "../controller/password_reset_controller"
import authorization from "../middleware/Authorization/authorization"

const router = express()


router.post("/changepassword", changePassword)
router.post("/forgetpassword", forgetPassword)
router.get("/verifyresetpassword/:token", verifyResetPassword )
router.post('/resetpassword/:token', resetPassword)


export default router
