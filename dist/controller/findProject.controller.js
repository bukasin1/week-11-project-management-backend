"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProjectByOwner = exports.getProjectsByUser = void 0;
const projectSchema_1 = __importDefault(require("../models/projectSchema"));
const getProjectsByUser = async (req, res) => {
    const loggedIn = req.user;
    const project = await projectSchema_1.default.find({ owner: loggedIn._id });
    // const id = loggedIn._id;
    // console.log('current user', id);
    res.status(200).send(project);
};
exports.getProjectsByUser = getProjectsByUser;
const updateProjectByOwner = async (req, res) => {
    const id = req.params.projectID;
    const newName = req.body.projectName;
    try {
        const updatedProject = await projectSchema_1.default.findOneAndUpdate({ _id: id }, { projectName: newName }, { new: true });
        res.status(201).send(updatedProject);
    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.updateProjectByOwner = updateProjectByOwner;
//# sourceMappingURL=findProject.controller.js.map