import { any, boolean, date, string } from 'joi';
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
    location: {
      type: String,
    },
    teams: {
      type: Array,
    },
    about: {
      type: String,
    },
    role:{
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
      default: '/Avatar/Avatar.png'
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
  userSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
 const User = mongoose.model('user', userSchema);

module.exports = User


// export default User;
