"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTaskByStatus = exports.deleteTask = exports.getAllTasks = exports.createTask = void 0;
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const cloudinary = require('cloudinary').v2;
const tasksSchema_1 = __importDefault(require("../models/tasksSchema"));
const projectSchema_1 = __importDefault(require("../models/projectSchema"));
const tasksSchema_2 = __importDefault(require("../models/tasksSchema"));
const getAllTasks = async (req, res) => {
    try {
        const loggedUser = req.user;
        const task = await tasksSchema_1.default.find({ assignedUser: loggedUser._id });
        res.status(201).send(task);
    }
    catch (err) {
        res.status(500).send({
            error: err,
        });
    }
};
exports.getAllTasks = getAllTasks;
const createTask = async (req, res) => {
    var _a, _b;
    try {
        let img_Url;
        const loggedInUser = req.user;
        const projectId = req.params.projectId;
        const project = await projectSchema_1.default.findById(projectId);
        if (((_a = loggedInUser._id) === null || _a === void 0 ? void 0 : _a.toString()) === project.owner) {
            const projectID = req.params.projectId;
            const task = new tasksSchema_2.default({
                projectID,
                owner: project.owner,
                title: req.body.title,
                description: req.body.description,
                comments: req.body.comments,
                assignedUser: req.body.assignedUser,
            });
            if (req.file) {
                const { url } = await cloudinary.uploader.upload((_b = req.file) === null || _b === void 0 ? void 0 : _b.path);
                img_Url = url;
                task.files.push({ fileUrl: img_Url });
            }
            const result = await task.save();
            return res.send(result);
        }
        res.send('This user cannot create task on the project');
    }
    catch (err) {
        res.send(err);
    }
};
exports.createTask = createTask;
async function getTaskByStatus(req, res) {
    const taskStatus = await tasksSchema_1.default.findOne({
        status: req.params.status,
    });
    if (!taskStatus) {
        res.status(404).send(` Task with Status "${req.params.status}" is not found `);
    }
    else {
        res.status(200).send(taskStatus);
    }
}
exports.getTaskByStatus = getTaskByStatus;
const deleteTask = async (req, res) => {
    try {
        //get the task that wants to be deleted
        const taskId = req.params.id;
        const task = tasksSchema_1.default.findOne({ _id: taskId });
        const taskProjectId = task.projectID;
        const taskProject = projectSchema_1.default.findOne({ _id: taskProjectId });
        const loggedUser = req.user;
        const isOwner = taskProject.owner === loggedUser._id;
        if (!isOwner) {
            return res.status(401).json({
                msg: 'Sorry you are not the owner of the project. you cant perform this operation',
            });
        }
        const deletedTask = tasksSchema_1.default.findOneAndDelete({ _id: taskId });
        res.status(201).send(deletedTask);
    }
    catch (err) {
        res.status(500).send({
            error: err,
        });
    }
};
exports.deleteTask = deleteTask;
//# sourceMappingURL=task-controller.js.map