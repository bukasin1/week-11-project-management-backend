"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.verifyResetPassword = exports.forgetPassword = exports.changePassword = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const bcrypt_1 = __importDefault(require("bcrypt"));
const userschema_1 = __importDefault(require("../models/userschema"));
const sendemail_1 = require("../sendemail/sendemail");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function changePassword(req, res) {
    const user = req.user;
    const { oldPassword, newPassword, repeatPassword } = req.body;
    const email = user.email;
    try {
        const validPassword = await bcrypt_1.default.compare(oldPassword, req.user.password);
        if (validPassword) {
            if (newPassword === repeatPassword) {
                const newPasswordUpdate = await bcrypt_1.default.hash(newPassword, 10);
                const newUserInfo = await userschema_1.default.findOneAndUpdate({ email: email }, { password: newPassword }, { new: true });
                return res.status(200).json({
                    newUserInfo,
                });
            }
        }
        else {
            res.status(403).json({
                message: 'Incorrect password',
            });
        }
    }
    catch (err) {
        res.status(400).json({
            error: err,
        });
        return;
    }
}
exports.changePassword = changePassword;
async function forgetPassword(req, res) {
    try {
        const { email } = req.body;
        console.log(email);
        const user = await userschema_1.default.findOne({ email: email });
        if (user) {
            let secret = process.env.SECRET_KEY_AUTH;
            const token = jsonwebtoken_1.default.sign({ id: user._id }, secret, { expiresIn: '30mins' });
            const link = `${process.env.APIURL}/password/verifyresetpassword/${token}`;
            const body = `
      Dear ${user.firstname},
      <p>Follow this <a href=${link}> link </a> to change your password. The link would expire in 30 mins.</P>
            `;
            (0, sendemail_1.sendSignUpmail)(email, body);
            res.status(200).json({
                message: 'Link sent to your mail.',
                link: link,
            });
        }
        else {
            res.status(400).json({
                message: 'Wrong email provided',
            });
            return;
        }
    }
    catch (err) {
        console.log(err);
        res.status(404).json({
            message: 'Route crashed',
        });
    }
}
exports.forgetPassword = forgetPassword;
async function verifyResetPassword(req, res) {
    //get
    let { token } = req.params;
    let secret = process.env.SECRET_KEY_AUTH;
    const verification = (await jsonwebtoken_1.default.verify(token, secret)); ///verification
    const id = verification.id;
    const isValidId = userschema_1.default.findOne({ _id: id });
    try {
        if (isValidId) {
            //line missing?
            // token = jwt.sign({ id: id }, secret, { expiresIn: '1d' });
            // res.render('password-rest', { title: 'password-rest', token: token });
            res.redirect(`${process.env.REACTURL}/password/resetpassword/${token}`);
            return;
        }
        res.redirect(`${process.env.REACTURL}/forgotpassword/${token}`);
    }
    catch (err) {
        console.log(err);
        // res.json({
        //   message: err,
        // });
        res.redirect(`${process.env.REACTURL}/forgotpassword/${token}`);
    }
}
exports.verifyResetPassword = verifyResetPassword;
async function resetPassword(req, res) {
    //post
    const token = req.params.token;
    try {
        // res.json(req.params)
        let secret = process.env.SECRET_KEY_AUTH;
        const verification = (await jsonwebtoken_1.default.verify(token, secret));
        const id = verification.id;
        if (verification) {
            const user = await userschema_1.default.findOne({ _id: id });
            if (user) {
                let { newPassword, repeatPassword } = req.body;
                if (newPassword === repeatPassword) {
                    newPassword = await bcrypt_1.default.hash(newPassword, 10);
                    const updatedUser = await userschema_1.default.findOneAndUpdate({ _id: id }, { password: newPassword }, { new: true });
                    res.status(200).json({
                        updatedUser: updatedUser,
                    });
                    return;
                }
                else {
                    res.status(400).json({
                        message: "newpassword and repeatpassword don't match",
                    });
                    return;
                }
            }
            else {
                res.status(400).json({
                    message: 'user does not exist',
                });
                return;
            }
        }
        else {
            res.status(400).json({
                message: 'verification error',
            });
            return;
        }
    }
    catch (err) {
        res.status(400).json({
            message: 'This is the catch block message',
            // message: "Catch block",
            error: err.message,
        });
        return;
    }
}
exports.resetPassword = resetPassword;
//# sourceMappingURL=password_reset_controller.js.map