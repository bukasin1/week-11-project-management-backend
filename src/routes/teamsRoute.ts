import {Router} from 'express'
import {getAllTeams} from '../controller/teams_controller'

const router = Router()

router.get('/allTeams', getAllTeams)
