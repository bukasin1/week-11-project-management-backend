"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTask = void 0;
const tasksSchema_1 = __importDefault(require("../models/tasksSchema"));
const projectSchema_1 = __importDefault(require("../models/projectSchema"));
const cloudinary = require('cloudinary').v2;
const createTask = async (req, res, next) => {
    var _a, _b;
    try {
        let img_Url;
        const loggedInUser = req.user;
        const projectId = req.params.projectId;
        const project = await projectSchema_1.default.findById(projectId);
        if (((_a = loggedInUser._id) === null || _a === void 0 ? void 0 : _a.toString()) === project.owner) {
            const projectID = req.params.projectId;
            const task = new tasksSchema_1.default({
                projectID,
                owner: project.owner,
                title: req.body.title,
                description: req.body.description,
                comments: req.body.comments,
                assignedUser: req.body.assignedUser
            });
            console.log(req.file);
            if (req.file) {
                const { url } = await cloudinary.uploader.upload((_b = req.file) === null || _b === void 0 ? void 0 : _b.path);
                img_Url = url;
                task.files.push({ fileUrl: img_Url });
            }
            const result = await task.save();
            return res.send(result);
        }
        res.send("This user cannot create task on the project");
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }
};
exports.createTask = createTask;
// export const deleteTask = async(req: Request, res: Response, next: NextFunction) =>{
//   const {id} = req.body
//   const ID = req.params.id
//    const value = result.filter((id)=> id !== ID)
//    res.send('value deleted succesfully')
// }
//# sourceMappingURL=task.js.map