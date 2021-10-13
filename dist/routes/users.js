"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controller/user.controller");
const router = (0, express_1.Router)();
/* GET users listing. */
router.get('/', function (_req, res) {
    res.send('respond with a resource');
});
router.post('/signup', user_controller_1.signUpUser);
router.post('/verify/:id', user_controller_1.verifyUser);
exports.default = router;
//# sourceMappingURL=users.js.map