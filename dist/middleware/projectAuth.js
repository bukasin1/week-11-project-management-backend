"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectAuth = void 0;
const projectSchema_1 = __importDefault(require("../models/projectSchema"));
const tasksSchema_1 = __importDefault(require("../models/tasksSchema"));
const teamsSchema_1 = __importDefault(require("../models/teamsSchema"));
async function projectAuth(req, res, next) {
    var _a, _b;
    try {
        const loggedUser = req.user;
        let ownerId;
        const { taskID, projectID, teamID, commentID } = req.params;
        if (commentID) {
            const commentId = req.params.commentID;
            const task = await tasksSchema_1.default.findById(taskID);
            const comment = task.comments.find(comment => comment.id === commentId);
            if (comment) {
                ownerId = comment.createdBy.userId;
                if (((_a = loggedUser._id) === null || _a === void 0 ? void 0 : _a.toString()) === ownerId) {
                    next();
                    return;
                }
                res.status(404).json({
                    message: 'You did not create this comment and therefore are not authorized to edit/delete it',
                });
                return;
            }
            res.status(404).json({
                message: 'Comment not found',
            });
            return;
        }
        if (projectID) {
            const project = await projectSchema_1.default.findById(projectID);
            ownerId = project.owner;
        }
        if (taskID) {
            const task = await tasksSchema_1.default.findById(taskID);
            ownerId = task.owner;
        }
        if (teamID) {
            const team = await teamsSchema_1.default.findById(teamID);
            ownerId = team.owner;
        }
        if (((_b = loggedUser._id) === null || _b === void 0 ? void 0 : _b.toString()) === ownerId) {
            next();
            return;
        }
        res.status(404).json({
            message: 'You are not the owner of the project',
        });
        return;
    }
    catch (err) {
        console.log(err);
        res.status(404).json({
            message: 'You are not the owner of the project',
        });
    }
}
exports.projectAuth = projectAuth;
//# sourceMappingURL=projectAuth.js.map