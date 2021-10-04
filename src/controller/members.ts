import express from 'express';
import { IUser } from '../models/userschema';
import User from '../models/userschema';
import  Team from '../models/teamsSchema';
import Project from '../models/projectSchema';

// ADD MEMBERS
 export async function addMembers(req: express.Request, res: express.Response) {
     
 }



export async function updateMembers(req: express.Request, res: express.Response) {
    const team = await Team.findById(req.params.teamID)

    if(req.body.members){
        const members = req.body.members
        const addMembers = members.map((mem: string) => {
            return {userId: mem}
        })
        team.members.push(...addMembers)
    }

    team.teamName = req.body.teamName || team.teamName
    await team.save()
  
}