"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginPage = void 0;
/* eslint-disable no-console */
/* eslint-disable prefer-const */
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userschema_1 = __importDefault(require("../models/userschema"));
const joiAuth_1 = __importDefault(require("../validateJoi/joiAuth"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secretKey = process.env.TOKEN_KEY;
// TO LOGIN USER
async function loginPage(req, res) {
    try {
        const { error } = joiAuth_1.default.validate(req.body);
        if (error)
            return res.status(400).send(error.details[0].message);
        const email = req.body.email;
        console.log('email', email);
        let regUser = await userschema_1.default.findOne({ email: email }).exec();
        console.log('registered user', regUser);
        if (regUser.password) {
            if (!regUser)
                return res.status(400).send('Invalid Email or Password');
            const validPassword = await bcryptjs_1.default.compare(req.body.password, regUser.password);
            if (!validPassword)
                return res.status(400).send('Invalid Email or Password');
            const token = jsonwebtoken_1.default.sign({ _id: regUser._id.toString() }, secretKey, { expiresIn: '3600 seconds' });
            res.cookie('jwt', token);
            //res.status(200).send('You Have Been Login and Authenticated Successfully');
            // res.status(200).send({ regUser, token });
            res.redirect('/profile');
        }
        else {
            console.log('login error');
            return res.status(400).send('Invalid Email or Password');
            // res.redirect('/profile');
        }
    }
    catch (err) {
        console.log(err);
        res.status(401).send({
            error: "Server error"
        });
    }
}
exports.loginPage = loginPage;
//# sourceMappingURL=authentication.js.map