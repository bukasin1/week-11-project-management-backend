import mongoose from 'mongoose';

export interface ITeam extends mongoose.Document  {
  projectID?: string,
  members?: [teamMember]
}

export interface teamMember {
  userId : string
}

const teamSchema = new mongoose.Schema<ITeam>(
  {
    projectID: {
      type: String,
      required: true
    },
    teamName: {
      type: String,
      required: true
    },
    members: [
      {
        userId: String
      }
    ]
  },
  {
    timestamps: true,
  },
);

const Team = mongoose.model('team', teamSchema);
export default Team;

