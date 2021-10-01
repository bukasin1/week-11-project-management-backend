import mongoose from 'mongoose';

export interface ITeam {
  _id?: string,
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
    members: {
      type: [{
        userId: String
      }]
    }
  },
  {
    timestamps: true,
  },
);

const Team = mongoose.model('team', teamSchema);
export default Team;
