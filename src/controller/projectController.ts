import { Request, Response } from 'express';
import Project, { IProject } from '../models/projectSchema';
import User, { IUser, userProject } from '../models/userschema';
import { sendSignUpmail } from '../sendemail/sendemail';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Task, { ITask } from '../models/tasksSchema';
const cloudinary = require('cloudinary').v2;
const secret = process.env.SECRET_KEY_AUTH as string;
const secretKey = process.env.TOKEN_KEY as string;

export async function createProject(req: Request, res: Response) {
  try {
    const projectName = req.body.projectName
      .trim()
      .split(' ')
      .filter((space: string) => space !== '')
      .join(' ');
    console.log(projectName);
    const existingProject = await Project.findOne({ projectName });
    if (existingProject) {
      return res.status(409).send(`Project with name ${existingProject.projectName} exists already`);
    }
    const loggedUser = req.user as IUser;
    const creator = await User.findOne({ email: loggedUser.email });
    const project = await Project.create({
      owner: loggedUser._id,
      projectName,
    });
    creator.projects?.push({
      projectId: project._id,
      projectName: project.projectName,
      owner: true
    });
    await creator.save();
    res.status(201).send(project);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: err,
    });
  }
}

export async function projectInvite(req: Request, res: Response) {
  try {
    const loggedUser = req.user as IUser;
    const { email } = req.body;
    const projectId = req.params.projectID;
    const project = await Project.findById(projectId);
    const ownerId = await project.owner;
    if (loggedUser._id?.toString() === ownerId) {
      const token = jwt.sign({ email }, secret, { expiresIn: '3d' });
      const owner: IUser = (await User.findById(ownerId)) as IUser;
      const fullname = ((owner.firstname as string) + owner.lastname) as string;
      const link = `https://jaraaa.herokuapp.com/profile/${projectId}/create-collaborator/${token}`;
      const body = `
      Hello,
      <p>You have been invited to collaborate on a project by ${fullname} </p>
      <p>Follow this <a href=${link}> link </a> to accept this invite</P>
            `;
      sendSignUpmail(email, body);
      res.status(200).json({
        message: 'Invite email sent',
        link: link,
      });
    } else {
      res.status(200).json({
        message: 'You are not the owner of the project and therefore cant send out invites',
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: err,
    });
  }
}

// export async function getSignupCollaborator(req: Request, res: Response){
//   try{
//     const {paramEmail, projectID, token} = req.params
//     const {bodyEmail, firstname, lastname, password} = req.body
//     const decode = jwt.verify(token, secret)
//   }catch(err){
//     console.log(err)
//   }
// }

export async function addCollaborator(req: Request, res: Response) {
  try {
    const { projectID, token } = req.params;
    const decode = jwt.verify(token, secret) as JwtPayload;
    const existingUser = await User.findOne({ email: decode.email });
    if (existingUser) {
      const existingProject = existingUser.projects.find((project: userProject) => project.projectId === projectID);
      if (existingProject) return res.status(409).send(`You are already a collaborator on this project`);
      const project = await Project.findById(projectID);
      project.collaborators?.push({ userId: existingUser._id });
      existingUser.projects?.push({
        projectId: projectID,
        projectName: project.projectName,
      });
      await project.save();
      await existingUser.save();
      const loggedUser = req.user as IUser;
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
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: err,
    });
  }
}

export async function signUpCollaborator(req: Request, res: Response) {
  try {
    res.render('signUpCollaborator');
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: err,
    });
  }
}

export async function createCollaborator(req: Request, res: Response) {
  try {
    const { projectID, email } = req.params;
    const project = await Project.findById(projectID);
    const { firstname, lastname, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
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
    project.collaborators?.push({ userId: newUser._id });
    await project.save();
    const signToken = jwt.sign({ _id: newUser._id.toString() }, secretKey, { expiresIn: '3600 seconds' });
    res.cookie('jwt', signToken);
    res.redirect('/profile');
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: err,
    });
  }
}

export const getProjectsByUser = async (req: Request, res: Response) => {
  const loggedIn = req.user as IUser;
  const user = (await User.findById(loggedIn._id)) as IUser;
  const projects = user.projects;

  // const project = await Project.find({ owner: loggedIn._id });
  const projs = projects?.map(async (pro) => {
    return await Project.findById(pro.projectId);
  }) as Promise<IProject>[];
  const allProjects = await Promise.all(projs);

  res.status(200).send(allProjects);
};

export const updateProjectByOwner = async (req: Request, res: Response) => {
  const id = req.params.projectID;
  const newName = req.body.projectName;
  try {
    const updatedProject = await Project.findOneAndUpdate({ _id: id }, { projectName: newName }, { new: true });
    res.status(201).send(updatedProject);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getProjectCollaborators = async(req: Request, res: Response) => {
  try{
    const id = req.params.projectID;
    const project = await Project.findById(id) as IProject
    if(project){
      const promiseOfCollaborators = project.collaborators.map(async(collab) => {
        const userInfo = await User.findById(collab.userId);
        if(userInfo){
          const { firstname, lastname, role, location, avatar } = userInfo;

          return {
            firstname,
            lastname,
            userId: collab.userId as string
          }
        }
      })

      const collaborators = await Promise.all(promiseOfCollaborators);

      res.status(200).json({
        data: collaborators.filter(collab => collab),
      });
      return;
    }
    res.status(404).json({
      err: "Project not found",
    });
  }catch(err){
    console.log(err, "error")
    res.status(500).send(err);
  }
}
