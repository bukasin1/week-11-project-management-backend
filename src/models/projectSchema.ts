import mongoose from 'mongoose';

export interface IProject extends mongoose.Document  {
  owner?: string,
  projectName?: string,
  collaborators: Array<{userId: string}>
}

const projectSchema = new mongoose.Schema<IProject>(
  {
    owner: {
      type: String
    },
    projectName: {
      type: String,
      unique: true,
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
