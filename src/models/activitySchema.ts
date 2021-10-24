import mongoose from 'mongoose';

export interface IActivity extends mongoose.Document {
  [x: string]: any;
  projectId: string;
  activityName?: string;
  commentDetails?: string;
  performer: {
    avatar?: string
    userId: string,
    userName: string
  };
}


const activitySchema = new mongoose.Schema<IActivity>(
  {
    projectID: String,
    activityName: {
      type: String,
      required: true,
    },
    commentDetails: String,
    performer: {
      avatar: String,
      userId: String,
      userName: String
    }
  },
  {
    timestamps: true,
  },
);

const Activity = mongoose.model('activity', activitySchema);
export default Activity;
