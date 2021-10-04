import mongoose from 'mongoose';

export interface ITask extends mongoose.Document {
  title: string;
  projectID: string;
  assignedUser: string;
  description: string;
  files: [file];
  comments: [comment];
  dueDate: Date;
  status: string;
}

export interface file {
  fileUrl: string;
}

export interface comment {
  content: string;
}
const taskSchema = new mongoose.Schema<ITask>(
  {
    projectID: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    assignedUser: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    files: [
      {
        fileUrl: String,
      },
    ],
    comments: [
      {
        content: String,
      },
    ],
    dueDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['backlog', 'todo', 'done'],
      default: 'backlog',
    },
  },
  {
    timestamps: true,
  },
);

const Task = mongoose.model('task', taskSchema);
export default Task;
