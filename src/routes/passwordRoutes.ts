import express from "express"
import { changePassword } from "../controllers/password_reset_controller"
import authorization from "../Authorization/authorization"

const router = express()


router.post("/password/changepassword", authorization, changePassword)
router.post("/changepassword", )
