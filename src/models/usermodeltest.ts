import mongoose from 'mongoose';

export interface IUser {
  id: string | number;
  userName: string;
  googleId: string;
}

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
    },
    googleId: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model('usertest', userSchema);
export default User;
