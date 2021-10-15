'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.leaveTeam =
  exports.updateMembers =
  exports.getAllTeamMembers =
  exports.addMemberToTeam =
  exports.createTeam =
    void 0;
const teamsSchema_1 = __importDefault(require('../models/teamsSchema'));
const projectSchema_1 = __importDefault(require('../models/projectSchema'));
const joi_1 = __importDefault(require('joi'));
async function createTeam(req, res) {
  const { projectID } = req.params;
  const loggedInUser = req.user;
  const { teamName } = req.body;
  const project = await projectSchema_1.default.findOne({ _id: projectID });
  console.log(project);
  if (project) {
    const teamSchema = joi_1.default.object({
      teamName: joi_1.default.string().trim().required(),
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
      const existingTeam = await teamsSchema_1.default.findOne({ teamName });
      if (existingTeam) {
        return res.status(400).json({
          message: `The name ${teamName} already exists`,
        });
      }
      const newTeam = await teamsSchema_1.default.create({
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
exports.createTeam = createTeam;
async function addMemberToTeam(req, res) {
  const ownerId = req.user;
  const { memberId } = req.body; ///add team members email
  const { teamID } = req.params;
  const team = await teamsSchema_1.default.findOne({ _id: teamID, owner: ownerId._id });
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
    const updatedteam = await teamsSchema_1.default.findByIdAndUpdate(
      { _id: teamID },
      { members: members },
      { new: true },
    );
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
exports.addMemberToTeam = addMemberToTeam;
//   /////get all team members
async function getAllTeamMembers(req, res) {
  const { teamID } = req.params;
  console.log(teamID);
  try {
    const team = await teamsSchema_1.default.findOne({ _id: teamID });
    console.log('team', team);
    if (team) {
      const { members } = team;
      return res.status(200).json({
        message: `All members in ${team.teamName} team`,
        members: members,
        // team: team,
      });
    }
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
}
exports.getAllTeamMembers = getAllTeamMembers;
//update members
async function updateMembers(req, res) {
  const team = await teamsSchema_1.default.findById(req.params.teamID);
  if (req.body.members) {
    const members = req.body.members;
    const addMembers = members.map((mem) => {
      return { userId: mem };
    });
    team.members.push(...addMembers);
  }
  team.teamName = req.body.teamName || team.teamName;
  await team.save();
  return res.status(201).json({
    message: `Successful`,
    updatedteam: team,
  });
}
exports.updateMembers = updateMembers;
////leave a team//////////
async function leaveTeam(req, res) {
  const { teamID } = req.params;
  const loggedInUser = req.user;
  console.log(loggedInUser, loggedInUser._id, 'user');
  const team = await teamsSchema_1.default.findOne({ _id: teamID });
  if (team) {
    const { members, teamName } = team;
    const user = members.filter((val) => val.userId === loggedInUser._id);
    if (user.length == 0) {
      return res.status(400).json({
        message: `Sorry, you are not a member of team ${teamName}`,
      });
    }
    const updatedMembers = members.filter((val) => {
      return val.userId !== loggedInUser._id;
    });
    const updatedteam = await teamsSchema_1.default.findByIdAndUpdate(
      { _id: teamID },
      { members: updatedMembers },
      { new: true },
    );
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
exports.leaveTeam = leaveTeam;
//# sourceMappingURL=teams_controller.js.map
