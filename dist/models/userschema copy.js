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
}, {
    timestamps: true,
});
const User = mongoose_1.default.model('user', userSchema);
exports.default = User;
//# sourceMappingURL=userschema%20copy.js.map