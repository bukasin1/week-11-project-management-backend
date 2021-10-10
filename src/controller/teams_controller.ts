/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response } from 'express';
import Team, { ITeam } from '../models/teamsSchema';
import Project from '../models/projectSchema';
import Joi from 'joi';
import User, { IUser } from '../models/userschema';
import express from 'express';





export async function createTeam(req: Request, res: Response) {
  const { projectID } = req.params;
  const loggedInUser = req.user as IUser;
  const { teamName } = req.body;
  const project = await Project.findOne({ _id: projectID });
  console.log(project);
  if (project) {
    const teamSchema = Joi.object({
      teamName: Joi.string().trim().required(),
    });
    try {
      const inputValidation = await teamSchema.validate(req.body);
      if (inputValidation.error) {
        console.log('validation error');
        res.status(400).json({
          message: 'Invalid input, check and try again',
          error: inputValidation.error.details[0].message,
        });
        return;
      }
      const existingTeam = await Team.findOne({ teamName });
      if (existingTeam) {
        return res.status(400).json({
          message: `The name ${teamName} already exists`,
        });
      }
      const newTeam = await Team.create({
        teamName,
        owner: loggedInUser._id,
        projectID,
      });
      console.log('New team', newTeam);
      return res.json({
        messsage: 'Team created successfully.',
        teamCreated: newTeam,
        membersStatus: 'No members added',
      });
    } catch (err) {
      res.json({
        message: err,
      });
    }
  }
}

export async function addMemberToTeam(req: Request, res: Response) {
  const ownerId = req.user as IUser;
  const { memberId } = req.body; ///add team members email
  const { teamID } = req.params;
  const team: ITeam = await Team.findOne({ _id: teamID, owner: ownerId._id });
  if (team) {
    const { owner, teamName, members } = team; /////how could i have dealt with this without using the if block
    console.log('ownerId', ownerId, 'createdBy', owner);
    console.log(members, 'members');
    const newteamMember = members.filter((val) => val.userId === memberId);
    if (newteamMember.length !== 0) {
      return res.status(400).json({
        message: `The member already exist on the team ${teamName}`,
      });
    }
    console.log(memberId, 'memberId');
    members.push({ userId: memberId }); ///ensure this line of code works
    console.log(members, 'members');
    const updatedteam = await Team.findByIdAndUpdate({ _id: teamID }, { members: members }, { new: true });
    return res.status(201).json({
      message: `Successful`,
      updatedteam: updatedteam,
      updatedMembers: members,
    });
  }
  return res.status(400).json({
    message: `Sorry, you don't have the permission to add memebrs to team you didn't create`,
  });
}

//   /////get all team members
export async function getAllTeamMembers(req: Request, res: Response) {
  const { teamID } = req.params;
  console.log(teamID);
  try {
    const team = await Team.findOne({ _id: teamID });
    console.log('team', team);
    if (team) {
      const { members } = team;
      return res.status(200).json({
        message: `All members in ${team.teamName} team`,
        members: members,
        // team: team,
      });
    }
  } catch (err: any) {
    return res.status(400).json({
      error: err.message,
    });
  }
}


//update members
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
  return res.status(201).json({
    message: `Successful`,
    updatedteam: team
  });
}
////leave a team//////////
export async function leaveTeam(req: Request, res: Response) {
  const { teamID } = req.params;
  const loggedInUser = req.user as IUser;
  console.log(loggedInUser, loggedInUser._id, 'user');
  const team = await Team.findOne({ _id: teamID }) as ITeam;
  if (team) {
    const { members, teamName } = team;
    const user = members.filter(val => val.userId === loggedInUser._id);
    if (user.length == 0) {
      return res.status(400).json({
        message: `Sorry, you are not a member of team ${teamName}`,
      });
    }
    const updatedMembers = members.filter(val => {
      return val.userId !== loggedInUser._id;
    });
    const updatedteam = await Team.findByIdAndUpdate({ _id: teamID }, { members: updatedMembers }, { new: true });
    return res.status(200).json({
      message: `Successful removal of req.params.teamID from team ${teamName}`,
      updatedMembers: updatedMembers,
      updatedteam: updatedteam,
    });
  } else {
    return res.status(200).json({
      message: `Team doesn't exists`,
    });
  }
}
