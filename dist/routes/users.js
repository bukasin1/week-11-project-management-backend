"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controller/user.controller");
const activities_controllers_1 = require("../controller/activities-controllers");
const auth_check_1 = require("../middleware/auth-check");
const router = (0, express_1.Router)();
/* GET users listing. */
router.get('/', function (_req, res) {
    res.send('respond with a resource');
});
router.post('/signup', user_controller_1.signUpUser);
router.get('/verify/:id', user_controller_1.verifyUser);
router.get('/:projectID/activities', auth_check_1.isLoggedIn, activities_controllers_1.getTodayActivities);
router.get('/:projectID/previous-activities', auth_check_1.isLoggedIn, activities_controllers_1.getYesterActivities);
exports.default = router;
//# sourceMappingURL=users.js.map