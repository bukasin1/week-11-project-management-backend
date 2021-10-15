"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = exports.signUpUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userschema_1 = __importDefault(require("../models/userschema"));
const utils_validate_1 = require("../utils/utils.validate");
const sendemail_1 = require("../sendemail/sendemail");
const signUpUser = async (req, res) => {
    const { error } = (0, utils_validate_1.validateUserSignUp)(req.body);
    if (error) {
        return res.status(404).send(error.details[0].message);
    }
    const email = req.body.email;
    const user = await userschema_1.default.findOne({ email: email });
    if (user) {
        return res.status(409).send(`user with ${email} exists already`);
    }
    const password = req.body.password;
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const savedUser = await userschema_1.default.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPassword,
    });
    const message = `
  <p>Thank you for signing up with Project App. Please click verify below to complete your sign up</p>
  <br />
  <a href = "https://jaraaa.herokuapp.com/users/verify/${email}"><button type="submit">VERIFY</button></a>
  `;
    (0, sendemail_1.sendSignUpmail)(email, message);
    res.status(201).send(savedUser);
};
exports.signUpUser = signUpUser;
const verifyUser = async (req, res) => {
    const email = req.params.id;
    const verifiedUser = await userschema_1.default.findOneAndUpdate({ email: email }, { isVerified: true }, { new: true });
    res.status(200).send(verifiedUser);
};
exports.verifyUser = verifyUser;
//# sourceMappingURL=user.controller.js.map