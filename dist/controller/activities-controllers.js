"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getYesterdayActivities = exports.getActivities = void 0;
const userschema_1 = __importDefault(require("../models/userschema"));
const tasksSchema_1 = __importDefault(require("../models/tasksSchema"));
const getActivities = async (req, res) => {
    const loggedInUser = req.user;
    const user = await userschema_1.default.findById(loggedInUser._id);
    const userProjects = user.projects;
    const projectIds = userProjects.map((value) => value.projectId);
    const userTasks = await tasksSchema_1.default.find({ projectID: { $in: projectIds } });
    const findTodayTask = userTasks.filter((task) => task.updatedAt.toISOString().split('T')[0] === new Date().toISOString().split('T')[0]);
    return res.status(200).send(findTodayTask);
};
exports.getActivities = getActivities;
const getYesterdayActivities = async (req, res) => {
    const loggedInUser = req.user;
    const user = await userschema_1.default.findById(loggedInUser._id);
    const userProjects = user.projects;
    const projectIds = userProjects.map((value) => value.projectId);
    const userTasks = await tasksSchema_1.default.find({ projectID: { $in: projectIds } });
    const findYesterdayTask = userTasks.filter((task) => task.updatedAt.toISOString().split('T')[0] ===
        new Date(new Date().valueOf() - 1000 * 60 * 60 * 24).toISOString().split('T')[0]);
    return res.status(200).send(findYesterdayTask);
};
exports.getYesterdayActivities = getYesterdayActivities;
//# sourceMappingURL=activities-controllers.js.map