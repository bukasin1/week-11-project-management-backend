"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const findProject_controller_1 = require("../controller/findProject.controller");
const auth_check_1 = require("../middleware/auth-check");
const router = (0, express_1.Router)();
router.route('').get(auth_check_1.isLoggedIn, findProject_controller_1.getProjectsByUser);
//.post(authenticateJWT, createTask);
exports.default = router;
//# sourceMappingURL=findProjectRoute.js.map