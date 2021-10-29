"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTaskByProject = exports.getTaskByStatus = exports.deleteTask = exports.getAllTasks = exports.deleteComment = exports.editComment = exports.getComments = exports.createComment = exports.updateTask = exports.createTask = void 0;
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const cloudinary = require('cloudinary').v2;
const tasksSchema_1 = __importDefault(require("../models/tasksSchema"));
const userschema_1 = __importDefault(require("../models/userschema"));
const projectSchema_1 = __importDefault(require("../models/projectSchema"));
const tasksSchema_2 = __importDefault(require("../models/tasksSchema"));
const projectSchema_2 = __importDefault(require("../models/projectSchema"));
const activitySchema_1 = __importDefault(require("../models/activitySchema"));
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
function makeComment(user, content) {
    const newComment = {
        createdBy: {
            userId: user._id,
            userName: user.firstname + ' ' + user.lastname,
            userRole: user.role
        },
        content,
        createdOn: Date.now(),
    };
    return newComment;
}
const createTask = async (req, res) => {
    var _a, _b;
    try {
        let img_Url;
        const loggedInUser = req.user;
        const projectID = req.params.projectID;
        const project = await projectSchema_1.default.findById(projectID);
        const user = await userschema_1.default.findById(req.body.assignedUser);
        if (((_a = loggedInUser._id) === null || _a === void 0 ? void 0 : _a.toString()) === project.owner) {
            const projectID = req.params.projectID;
            const task = new tasksSchema_2.default({
                projectID,
                owner: project.owner,
                title: req.body.title,
                description: req.body.description,
                assignedUser: req.body.assignedUser,
                dueDate: req.body.dueDate
            });
            await activitySchema_1.default.create({
                projectID,
                activityName: `Task ${task.title} was created and assigned to ${user.firstname} ${user.lastname}`,
                performer: {
                    userId: loggedInUser.id,
                    userName: loggedInUser.firstname + ' ' + loggedInUser.lastname
                }
            });
            if (req.body.comment) {
                const newComment = makeComment(loggedInUser, req.body.comment);
                task.comments.push(newComment);
                await activitySchema_1.default.create({
                    projectID,
                    activityName: `${loggedInUser.firstname} ${loggedInUser.lastname} commented on task ${task.title}`,
                    commentDetails: req.body.comment,
                    performer: {
                        avatar: loggedInUser.avatar,
                        userId: loggedInUser.id,
                        userName: loggedInUser.firstname + ' ' + loggedInUser.lastname
                    }
                });
            }
            if (req.file) {
                let fileSize;
                if (req.file.size < 1000)
                    fileSize = req.file.size + 'B';
                if (req.file.size >= 1000 && req.file.size < 1000000)
                    fileSize = Math.round(req.file.size / 1000) + 'KB';
                if (req.file.size >= 1000000 && req.file.size < 1000000000)
                    fileSize = Math.round(req.file.size / 1000000) + 'MB';
                const { url } = await cloudinary.uploader.upload((_b = req.file) === null || _b === void 0 ? void 0 : _b.path);
                img_Url = url;
                const newFile = {
                    fileUrl: img_Url,
                    fileName: req.file.originalname,
                    uploadedBy: {
                        userId: loggedInUser._id
                    },
                    fileSize: fileSize,
                    uploadedOn: Date.now()
                };
                task.files.push(newFile);
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
async function updateTask(req, res) {
    var _a;
    try {
        const loggedInUser = req.user;
        const taskId = req.params.taskID;
        const task = await tasksSchema_2.default.findById(taskId);
        if (task) {
            const projectID = task.projectID;
            const { title, assignedUser, description, dueDate, status, comment } = req.body;
            if (comment) {
                const newComment = makeComment(loggedInUser, req.body.comment);
                task.comments.push(newComment);
                await activitySchema_1.default.create({
                    projectID,
                    activityName: `${loggedInUser.firstname} ${loggedInUser.lastname} commented on task ${task.title}`,
                    commentDetails: req.body.comment,
                    performer: {
                        avatar: loggedInUser.avatar,
                        userId: loggedInUser.id,
                        userName: loggedInUser.firstname + ' ' + loggedInUser.lastname
                    }
                });
            }
            if (req.file) {
                let fileSize;
                if (req.file.size < 1000)
                    fileSize = req.file.size + 'B';
                if (req.file.size >= 1000 && req.file.size < 1000000)
                    fileSize = Math.round(req.file.size / 1000) + 'KB';
                if (req.file.size >= 1000000 && req.file.size < 1000000000)
                    fileSize = Math.round(req.file.size / 1000000) + 'MB';
                const { url } = await cloudinary.uploader.upload((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
                const img_Url = url;
                const newFile = {
                    fileUrl: img_Url,
                    fileName: req.file.originalname,
                    uploadedBy: {
                        userId: loggedInUser._id
                    },
                    fileSize: fileSize,
                    uploadedOn: Date.now()
                };
                task.files.push(newFile);
            }
            if (assignedUser !== task.assignedUser) {
                const user = await userschema_1.default.findById(req.body.assignedUser);
                await activitySchema_1.default.create({
                    projectID,
                    activityName: `Task ${task.title} was assigned to ${user.firstname} ${user.lastname}`,
                    performer: {
                        userId: loggedInUser.id,
                        userName: loggedInUser.firstname + ' ' + loggedInUser.lastname
                    }
                });
            }
            console.log(title, 'title update');
            task.title = title || task.title;
            task.assignedUser = assignedUser || task.assignedUser;
            task.description = description || task.description;
            task.dueDate = dueDate || task.dueDate;
            task.status = status || task.status;
            await task.save();
            return res.status(201).send({
                message: `Task with id ${task._id} updated`
            });
        }
        res.status(404).send({
            message: "Task not found"
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            error: err
        });
    }
}
exports.updateTask = updateTask;
async function getTaskByStatus(req, res) {
    const taskStatus = await tasksSchema_1.default.find({
        projectID: req.params.projectID,
        status: req.params.status,
    });
    if (taskStatus.length === 0) {
        res.status(404).send(` No Tasks with Status "${req.params.status}" found `);
    }
    else {
        res.status(200).send(taskStatus);
    }
}
exports.getTaskByStatus = getTaskByStatus;
async function getTaskByProject(req, res) {
    try {
        const tasks = await tasksSchema_1.default.find({
            projectID: req.params.projectID,
        });
        const taskImproved = await Promise.all(tasks.map(async (singleTask) => {
            const assignedUser = await userschema_1.default.findById(singleTask.assignedUser);
            const AssignedUserDetails = {
                AssignedUserAvatar: assignedUser.avatar,
                AssaignedUserName: assignedUser.firstname + '.' + assignedUser.lastname[0],
            };
            return { id: singleTask._id, ...AssignedUserDetails, ...singleTask.toObject() };
        }));
        console.log(taskImproved);
        res.status(200).send(taskImproved);
    }
    catch (error) {
        console.log(error);
    }
}
exports.getTaskByProject = getTaskByProject;
const deleteTask = async (req, res) => {
    try {
        //get the task that wants to be deleted
        const taskId = req.params.taskID;
        const task = await tasksSchema_1.default.findOne({ _id: taskId });
        const taskProjectId = task.projectID;
        const taskProject = await projectSchema_1.default.findOne({ _id: taskProjectId });
        const loggedUser = req.user;
        const isOwner = taskProject.owner === loggedUser._id;
        if (!isOwner) {
            return res.status(401).json({
                msg: 'Sorry you are not the owner of the project. you cant perform this operation',
            });
        }
        const deletedTask = await tasksSchema_1.default.findOneAndDelete({ _id: taskId });
        res.status(201).send(deletedTask);
    }
    catch (err) {
        res.status(500).send({
            error: err,
        });
    }
};
exports.deleteTask = deleteTask;
// export const deleteTask = async(req: Request, res: Response, next: NextFunction) =>{
//   const {id} = req.body
//   const ID = req.params.id
//    const value = result.filter((id)=> id !== ID)
//    res.send('value deleted succesfully')
// }
async function createComment(req, res) {
    var _a, _b;
    try {
        const loggedInUser = req.user;
        const taskId = req.params.taskID;
        const task = (await tasksSchema_2.default.findById(taskId));
        const projectID = task.projectID;
        const project = (await projectSchema_2.default.findById(projectID));
        const isCollaborator = (_a = project.collaborators) === null || _a === void 0 ? void 0 : _a.find((user) => user.userId === loggedInUser.id);
        const isOwner = ((_b = project.owner) === null || _b === void 0 ? void 0 : _b.toString()) === loggedInUser._id.toString();
        if (isCollaborator || isOwner) {
            const { comment } = req.body;
            const newComment = makeComment(loggedInUser, req.body.comment);
            task.comments.push(newComment);
            await task.save();
            await activitySchema_1.default.create({
                projectID,
                activityName: `${loggedInUser.firstname} ${loggedInUser.lastname} commented on task ${task.title}`,
                commentDetails: req.body.comment,
                performer: {
                    avatar: loggedInUser.avatar,
                    userId: loggedInUser.id,
                    userName: (loggedInUser.firstname + ' ' + loggedInUser.lastname),
                },
            });
            res.status(201).send({
                message: `Comment created`,
            });
            return;
        }
        res.status(201).send({
            message: `You are not a collaborator on this project`,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            error: err,
        });
    }
}
exports.createComment = createComment;
async function getComments(req, res) {
    try {
        const taskId = req.params.taskID;
        const task = (await tasksSchema_2.default.findById(taskId));
        const comments = task.comments;
        res.status(201).send({
            status: 'Succesfull',
            comments,
        });
        return;
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            error: err,
        });
    }
}
exports.getComments = getComments;
async function editComment(req, res) {
    try {
        const loggedInUser = req.user;
        const taskId = req.params.taskID;
        const commentId = req.params.commentID;
        const task = (await tasksSchema_2.default.findById(taskId));
        const comment = task.comments.find((comment) => comment.id === commentId);
        const commentIndex = task.comments.findIndex((comment) => comment.id === commentId);
        const { content, createdBy, createdOn, _id, id } = comment;
        const editedComment = {
            ...{ content, createdBy, createdOn, _id },
            content: req.body.comment || content,
            updatedOn: Date.now(),
        };
        task.comments[commentIndex] = editedComment;
        await task.save();
        res.status(201).send({
            message: `Succesfull!, comment ${commentId} edited `,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            error: err,
        });
    }
}
exports.editComment = editComment;
async function deleteComment(req, res) {
    try {
        const loggedInUser = req.user;
        const taskId = req.params.taskID;
        const commentId = req.params.commentID;
        const task = (await tasksSchema_2.default.findById(taskId));
        const commentIndex = task.comments.findIndex((comment) => comment.id === commentId);
        task.comments.splice(commentIndex, 1);
        await task.save();
        await activitySchema_1.default.create({
            projectID: task.projectID,
            activityName: ``,
            performer: {
                userId: loggedInUser.id,
                userName: (loggedInUser.firstname + ' ' + loggedInUser.lastname),
            },
        });
        res.status(201).send({
            message: `Succesfull!, comment ${taskId} deleted `,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            error: err,
        });
    }
}
exports.deleteComment = deleteComment;
//# sourceMappingURL=task-controller.js.map