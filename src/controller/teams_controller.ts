import { Request, Response} from 'express'
import Teams from '../models/teamsSchema'


export async function getAllTeams(req: Request, res: Response){
 try{
  const teams = await Teams.find({})
  return res.json(teams)
 }
 catch(err){
   res.status(400).json({
     error:err
   })
 }
}

async function getSingleTeam(req: Request, res: Response){
  const team_id = req.params.id;
  const teamName = req.body
    const team = await Team.findOne({
      include: [
        { model: Project },
        { model: User, attributes: ["name", "email", "id"] },
      ],
      where: { id: team_id },
    });
    if (!team) {
      res.send({ error: "No team exists" });
    }
    res.json(team);
  }
