"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editProfile = exports.showProfile = void 0;
// import {User, IUser}from '../models/userschema';
const userschema_1 = __importDefault(require("../models/userschema"));
const cloudinary = require('cloudinary').v2;
const showProfile = (req, res) => {
    const user = req.user;
    res.status(200).send({
        status: "Successful",
        user
    });
    // res.render('profile', { user: user.firstname });
};
exports.showProfile = showProfile;
async function editProfile(req, res) {
    var _a;
    const loggedUser = req.user;
    // let id = req.params.id
    let id = loggedUser._id;
    const user = await userschema_1.default.findById(id);
    let img_Url;
    if (req.file) {
        const { url } = await cloudinary.uploader.upload((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
        console.log("url", url);
        img_Url = url;
    }
    else {
        const user = await userschema_1.default.findById(id);
        console.log(user);
        img_Url = user.avatar;
    }
    const newUser = userschema_1.default.findByIdAndUpdate(id, {
        firstname: req.body.firstname || user.firstname,
        lastname: req.body.lastname || user.lastname,
        gender: req.body.gender || user.gender,
        role: req.body.role || user.role,
        location: req.body.location || user.location,
        teams: req.body.teams || user.teams,
        about: req.body.about || user.about,
        avatar: img_Url || user.avatar
    }, (err) => {
        if (err) {
            res.status(404).json({
                message: err.message,
                type: "fail"
            });
        }
        else {
            res.status(201).json({
                message: "Profile updated successfully!"
            });
        }
    });
}
exports.editProfile = editProfile;
//# sourceMappingURL=profile-controller.js.map