import mongoose from 'mongoose';

export interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  gender: string;
  role: string;
  location: string;
  teams: string[];
  about: string;
  isVerified: boolean;
  img: string;
  resetpasswordtoken: string;
  resetpasswordexpires: Date;
}

const userSchema = new mongoose.Schema(
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
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
    },
    location: {
      type: String,
    },
    teams: {
      type: Array,
    },
    about: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    img: {
      type: Buffer,
      contentType: String,
    },
    resetpasswordtoken: {
      type: String,
    },
    resetpasswordexpires: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model('user', userSchema);
export default User;
