"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectsByUser = void 0;
const projectSchema_1 = __importDefault(require("../models/projectSchema"));
// export const createTask = async (req: Request, res: Response) => {
//   const task = req.body;
//   const newtask = { ...task, createdBy: req.user.email };
//   console.log(newtask);
//   const createdTask = await Task.create(newtask);
//   res.status(201).send(createdTask);
// };
const getProjectsByUser = async (req, res) => {
    const loggedIn = req.user;
    const project = await projectSchema_1.default.find({ owner: loggedIn._id });
    const id = loggedIn._id;
    console.log('current user', id);
    res.status(200).send(project);
};
exports.getProjectsByUser = getProjectsByUser;
//# sourceMappingURL=task.controller.js.map