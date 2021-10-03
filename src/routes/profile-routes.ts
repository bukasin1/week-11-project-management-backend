import { Router } from 'express';
import { upload } from '../controller/file_uploads';
import { create, Profile } from '../controller/profile';
import { showProfile } from '../controller/profile-controller';
import { addCollaborator, createCollaborator, createProject, projectInvite, signUpCollaborator } from '../controller/projectController';
import { authCheck, isLoggedIn } from '../middleware/auth-check';
import { projectAuth } from '../middleware/projectAuth';
const router = Router();

router.get('/', isLoggedIn, showProfile);
router.put('/edit',isLoggedIn,upload, Profile)
router.post('/create-project', isLoggedIn, createProject)
router.post('/:projectID/project-invite', isLoggedIn,projectAuth, projectInvite)
router.get('/:projectID/create-collaborator/:token', addCollaborator)
router.get('/collaborator-profile/:projectID/:email', signUpCollaborator)
router.post('/collaborator-profile/:projectID/:email', createCollaborator)
router.post('/postUser', create)

export default router;
