"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
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
        required: true,
    },
    gender: {
        type: String,
        default: null,
        enum: ['male', 'female', null],
    },
    role: {
        type: String,
    },
    location: {
        type: String,
    },
    projects: [
        {
            projectId: String,
            projectName: String,
            owner: Boolean,
        },
    ],
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
        type: String,
    },
    googleId: {
        type: String,
    },
}, {
    timestamps: true,
});
const User = mongoose_1.default.model('user', userSchema);
exports.default = User;
//# sourceMappingURL=userschema.js.map