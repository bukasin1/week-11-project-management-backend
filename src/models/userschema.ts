import mongoose from 'mongoose';

export interface IUser {
  _id?: string,
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  gender?: string;
  role?: string;
  location?: string;
  teams?: string[];
  about?: string;
  isVerified?: boolean;
  avater?: string;
  resetpasswordtoken?: string;
  resetpasswordexpires?: string;
  facebookId?: string;
  googleId?: string
}

const userSchema = new mongoose.Schema<IUser>(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
    },
    role: {
      type: String,
    },
    location: {
      type: String,
    },
    teams: {
      type: [String],
    },
    about: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
      contentType: String,
    },
    resetpasswordtoken: {
      type: String,
    },
    resetpasswordexpires: {
      type: String,
    },
    facebookId: {
      type: String
    },
    googleId: {
      type: String
    }
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model('user', userSchema);
export default User;
