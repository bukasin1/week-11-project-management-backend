import { Router } from 'express';
import { upload } from '../controller/file_uploads';
import { editProfile, showProfile } from '../controller/profile-controller';
import { addCollaborator, createCollaborator, createProject, getProjectCollaborators, projectInvite, signUpCollaborator } from '../controller/projectController';
import { createTask, updateTask } from '../controller/task-controller';
import { authCheck, isLoggedIn } from '../middleware/auth-check';
import { projectAuth } from '../middleware/projectAuth';
import { getProjectsByUser, updateProjectByOwner } from '../controller/projectController';
import { loginRedirect } from '../controller/auth-controller';
const router = Router();

router.get('/', isLoggedIn, loginRedirect);
router.put('/edit',isLoggedIn,upload, editProfile)
router.post('/create-project', isLoggedIn, createProject)
router.post('/:projectID/collaborators', isLoggedIn, getProjectCollaborators)
router.post('/:projectID/project-invite', isLoggedIn,projectAuth, projectInvite)
router.get('/:projectID/create-collaborator/:token', addCollaborator)
router.get('/collaborator-profile/:projectID/:email', signUpCollaborator)
router.post('/collaborator-profile/:projectID/:email', createCollaborator)
router.post('/:projectID/task',isLoggedIn, projectAuth, upload,createTask)
router.put('/:taskID', isLoggedIn,projectAuth,upload, updateTask)
router.get('/getprojects', isLoggedIn, getProjectsByUser);
router.post('/getproject/:projectID', isLoggedIn, projectAuth, updateProjectByOwner);
// router.delete('deleteTask', deleteTask )
// router.post('/:projectId/task', createTask)

export default router;
