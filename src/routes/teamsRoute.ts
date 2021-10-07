/* eslint-disable @typescript-eslint/no-unused-vars */
import {Router} from 'express'
import {createTeam, addMemberToTeam, getAllTeamMembers, leaveTeam} from '../controller/teams_controller'
import {isLoggedIn} from "../middleware/auth-check"

const router = Router()

router.post('/:projectID/createteam', isLoggedIn, createTeam)
router.post('/:teamID/addmembertoteam', isLoggedIn, addMemberToTeam)
router.get('/:teamID/getallteammembers', isLoggedIn, getAllTeamMembers)
router.delete('/:teamID/leaveteam', isLoggedIn, leaveTeam)

export default router
