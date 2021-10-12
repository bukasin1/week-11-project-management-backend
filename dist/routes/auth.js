"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-vars */
const express_1 = require("express");
const router = (0, express_1.Router)();
const authentication_1 = require("../controller/authentication");
//LOGIN PAGE
router.post('/login', authentication_1.loginPage);
exports.default = router;
//# sourceMappingURL=auth.js.map