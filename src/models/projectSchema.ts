import mongoose from 'mongoose';

export interface IProject {
  _id?: string,
  owner?: string,
  projectName?: string
}

const projectSchema = new mongoose.Schema<IProject>(
  {
    owner: {
      type: String,
      required: true
    },
    projectName: {
      type: String,
      required: true
    },
    collaborators: [
      {
        userId: String
      }
    ]
  },
  {
    timestamps: true,
  },
);

const Project = mongoose.model('project', projectSchema);
export default Project;
