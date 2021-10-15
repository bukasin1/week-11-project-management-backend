"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMembers = void 0;
const teamsSchema_1 = __importDefault(require("../models/teamsSchema"));
// ADD MEMBERS
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
}
exports.updateMembers = updateMembers;
//# sourceMappingURL=members.js.map