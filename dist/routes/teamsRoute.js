"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-vars */
const express_1 = require("express");
const teams_controller_1 = require("../controller/teams_controller");
const auth_check_1 = require("../middleware/auth-check");
const teams_controller_2 = require("../controller/teams_controller");
const projectAuth_1 = require("../middleware/projectAuth");
const router = (0, express_1.Router)();
router.post('/:projectID/createteam', auth_check_1.isLoggedIn, projectAuth_1.projectAuth, teams_controller_1.createTeam);
router.post('/:teamID/addmembertoteam', auth_check_1.isLoggedIn, projectAuth_1.projectAuth, teams_controller_1.addMemberToTeam);
router.put('/:teamID/updateTeam', auth_check_1.isLoggedIn, projectAuth_1.projectAuth, teams_controller_2.updateMembers);
router.get('/:teamID/getallteammembers', auth_check_1.isLoggedIn, teams_controller_1.getAllTeamMembers);
router.delete('/:teamID/leaveteam', auth_check_1.isLoggedIn, teams_controller_1.leaveTeam);
router.get('/:teamID/getuserdetails', auth_check_1.isLoggedIn, teams_controller_1.getUserDetails);
//get file uploads
router.get('/getfileuploads', auth_check_1.isLoggedIn, teams_controller_1.getFileUploads);
exports.default = router;
//# sourceMappingURL=teamsRoute.js.map