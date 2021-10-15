import mongoose from 'mongoose';

export interface ITask extends mongoose.Document {
  [x: string]: any;
  title: string;
  projectID: string;
  assignedUser: string;
  description: string;
  files: [file];
  comments: [iComment];
  dueDate: Date;
  status: string;
}

export interface file {
  fileUrl: string;
  uploadedBy: {
    userId: string,
    userName: string
  };
}

export interface iComment {
  _id?: string,
  id?: string,
  createdBy: {
    userId: string,
    userName: string
  };
  content: string;
  createdOn: number;
  updatedOn?: number;
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
        uploadedBy: {
          userId: String,
          userName: String
        }
      },
    ],
    comments: [
      {
        createdBy: {
          userId: String,
          userName: String
        },
        content: {
          type: String,
          required: true
        },
        createdOn: {
          type: Date,
          default: Date.now()
        },
        updatedOn: {
          type: Date
        }
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
