"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectCollaborators = exports.updateProjectByOwner = exports.getProjectsByUser = exports.createCollaborator = exports.signUpCollaborator = exports.addCollaborator = exports.projectInvite = exports.createProject = void 0;
const projectSchema_1 = __importDefault(require("../models/projectSchema"));
const userschema_1 = __importDefault(require("../models/userschema"));
const sendemail_1 = require("../sendemail/sendemail");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const cloudinary = require('cloudinary').v2;
const secret = process.env.SECRET_KEY_AUTH;
const secretKey = process.env.TOKEN_KEY;
async function createProject(req, res) {
    var _a;
    try {
        const projectName = req.body.projectName
            .trim()
            .split(' ')
            .filter((space) => space !== '')
            .join(' ');
        console.log(projectName);
        const existingProject = await projectSchema_1.default.findOne({ projectName });
        if (existingProject) {
            return res.status(409).send(`Project with name ${existingProject.projectName} exists already`);
        }
        const loggedUser = req.user;
        const creator = await userschema_1.default.findOne({ email: loggedUser.email });
        const project = await projectSchema_1.default.create({
            owner: loggedUser._id,
            projectName,
        });
        (_a = creator.projects) === null || _a === void 0 ? void 0 : _a.push({
            projectId: project._id,
            projectName: project.projectName,
            owner: true
        });
        await creator.save();
        res.status(201).send(project);
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            error: err,
        });
    }
}
exports.createProject = createProject;
async function projectInvite(req, res) {
    var _a;
    try {
        const loggedUser = req.user;
        const { email } = req.body;
        const projectId = req.params.projectID;
        const project = await projectSchema_1.default.findById(projectId);
        const ownerId = await project.owner;
        if (((_a = loggedUser._id) === null || _a === void 0 ? void 0 : _a.toString()) === ownerId) {
            const token = jsonwebtoken_1.default.sign({ email }, secret, { expiresIn: '3d' });
            const owner = (await userschema_1.default.findById(ownerId));
            const fullname = (owner.firstname + owner.lastname);
            const link = `https://jaraaa.herokuapp.com/profile/${projectId}/create-collaborator/${token}`;
            const body = `
      Hello,
      <p>You have been invited to collaborate on a project by ${fullname} </p>
      <p>Follow this <a href=${link}> link </a> to accept this invite</P>
            `;
            (0, sendemail_1.sendSignUpmail)(email, body);
            res.status(200).json({
                message: 'Invite email sent',
                link: link,
            });
        }
        else {
            res.status(200).json({
                message: 'You are not the owner of the project and therefore cant send out invites',
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            error: err,
        });
    }
}
exports.projectInvite = projectInvite;
// export async function getSignupCollaborator(req: Request, res: Response){
//   try{
//     const {paramEmail, projectID, token} = req.params
//     const {bodyEmail, firstname, lastname, password} = req.body
//     const decode = jwt.verify(token, secret)
//   }catch(err){
//     console.log(err)
//   }
// }
async function addCollaborator(req, res) {
    var _a, _b;
    try {
        const { projectID, token } = req.params;
        const decode = jsonwebtoken_1.default.verify(token, secret);
        const existingUser = await userschema_1.default.findOne({ email: decode.email });
        if (existingUser) {
            const existingProject = existingUser.projects.find((project) => project.projectId === projectID);
            if (existingProject)
                return res.status(409).send(`You are already a collaborator on this project`);
            const project = await projectSchema_1.default.findById(projectID);
            (_a = project.collaborators) === null || _a === void 0 ? void 0 : _a.push({ userId: existingUser._id });
            (_b = existingUser.projects) === null || _b === void 0 ? void 0 : _b.push({
                projectId: projectID,
                projectName: project.projectName,
            });
            await project.save();
            await existingUser.save();
            const loggedUser = req.user;
            if (req.user && loggedUser.email === decode.email) {
                return res.redirect('/profile');
            }
            return res.status(301).send({
                message: 'Please login to continue',
            });
        }
        req.logout();
        req.session = null;
        res.clearCookie('jwt');
        res.redirect(`/profile/collaborator-profile/${projectID}/${decode.email}`);
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            error: err,
        });
    }
}
exports.addCollaborator = addCollaborator;
async function signUpCollaborator(req, res) {
    try {
        res.render('signUpCollaborator');
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            error: err,
        });
    }
}
exports.signUpCollaborator = signUpCollaborator;
async function createCollaborator(req, res) {
    var _a;
    try {
        const { projectID, email } = req.params;
        const project = await projectSchema_1.default.findById(projectID);
        const { firstname, lastname, password } = req.body;
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = await userschema_1.default.create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: hashedPassword,
            isVerified: true,
            projects: [
                {
                    projectId: projectID,
                    projectName: project.projectName,
                },
            ],
        });
        (_a = project.collaborators) === null || _a === void 0 ? void 0 : _a.push({ userId: newUser._id });
        await project.save();
        const signToken = jsonwebtoken_1.default.sign({ _id: newUser._id.toString() }, secretKey, { expiresIn: '3600 seconds' });
        res.cookie('jwt', signToken);
        res.redirect('/profile');
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            error: err,
        });
    }
}
exports.createCollaborator = createCollaborator;
const getProjectsByUser = async (req, res) => {
    const loggedIn = req.user;
    const user = (await userschema_1.default.findById(loggedIn._id));
    const projects = user.projects;
    // const project = await Project.find({ owner: loggedIn._id });
    const projs = projects === null || projects === void 0 ? void 0 : projects.map(async (pro) => {
        return await projectSchema_1.default.findById(pro.projectId);
    });
    const allProjects = await Promise.all(projs);
    res.status(200).send(allProjects);
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
const getProjectCollaborators = async (req, res) => {
    try {
        const id = req.params.projectID;
        const project = await projectSchema_1.default.findById(id);
        if (project) {
            const promiseOfCollaborators = project.collaborators.map(async (collab) => {
                const userInfo = await userschema_1.default.findById(collab.userId);
                if (userInfo) {
                    const { firstname, lastname, role, location, avatar } = userInfo;
                    return {
                        firstname,
                        lastname,
                        userId: collab.userId
                    };
                }
            });
            const collaborators = await Promise.all(promiseOfCollaborators);
            res.status(200).json({
                data: collaborators.filter(collab => collab),
            });
            return;
        }
        res.status(404).json({
            err: "Project not found",
        });
    }
    catch (err) {
        console.log(err, "error");
        res.status(500).send(err);
    }
};
exports.getProjectCollaborators = getProjectCollaborators;
//# sourceMappingURL=projectController.js.map