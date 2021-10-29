"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const file_uploads_1 = require("../controller/file_uploads");
const profile_controller_1 = require("../controller/profile-controller");
const projectController_1 = require("../controller/projectController");
const task_controller_1 = require("../controller/task-controller");
const auth_check_1 = require("../middleware/auth-check");
const projectAuth_1 = require("../middleware/projectAuth");
const projectController_2 = require("../controller/projectController");
const auth_controller_1 = require("../controller/auth-controller");
const router = (0, express_1.Router)();
router.get('/', auth_check_1.isLoggedIn, auth_controller_1.loginRedirect);
router.put('/edit', auth_check_1.isLoggedIn, file_uploads_1.upload, profile_controller_1.editProfile);
router.post('/create-project', auth_check_1.isLoggedIn, projectController_1.createProject);
router.get('/:projectID/collaborators', auth_check_1.isLoggedIn, projectController_1.getProjectCollaborators);
router.post('/:projectID/project-invite', auth_check_1.isLoggedIn, projectAuth_1.projectAuth, projectController_1.projectInvite);
router.get('/:projectID/create-collaborator/:token', projectController_1.addCollaborator);
router.get('/collaborator-profile/:projectID/:email', projectController_1.signUpCollaborator);
router.post('/collaborator-profile/:projectID/:email', projectController_1.createCollaborator);
router.post('/:projectID/task', auth_check_1.isLoggedIn, projectAuth_1.projectAuth, file_uploads_1.upload, task_controller_1.createTask);
router.put('/:taskID', auth_check_1.isLoggedIn, file_uploads_1.upload, task_controller_1.updateTask);
router.get('/getprojects', auth_check_1.isLoggedIn, projectController_2.getProjectsByUser);
router.post('/getproject/:projectID', auth_check_1.isLoggedIn, projectAuth_1.projectAuth, projectController_2.updateProjectByOwner);
// router.delete('deleteTask', deleteTask )
// router.post('/:projectId/task', createTask)
exports.default = router;
//# sourceMappingURL=profile-routes.js.map