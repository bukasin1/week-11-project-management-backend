"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controller/auth-controller");
const router = (0, express_1.Router)();
//LOGIN PAGE
// router.post('/login', loginPage);
router.post('/login', (0, auth_controller_1.localAuth)());
router.get('/login', auth_controller_1.login);
router.get('/google', auth_controller_1.googleHandler);
router.get('/logout', auth_controller_1.logout);
router.get('/google/redirect', auth_controller_1.redirectHandler, auth_controller_1.redirect);
router.get("/facebook", (0, auth_controller_1.getFacebookAuth)());
router.get("/facebook/callback", (0, auth_controller_1.authFacebook)());
exports.default = router;
//# sourceMappingURL=auth-routes.js.map