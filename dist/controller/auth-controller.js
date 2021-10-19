"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redirectHandler = exports.redirect = exports.logout = exports.googleHandler = exports.login = exports.ssoRedirect = exports.loginRedirect = exports.localAuth = exports.authFacebook = exports.getFacebookAuth = exports.loginPage = void 0;
const passport_1 = __importDefault(require("passport"));
const joiAuth_1 = __importDefault(require("../validateJoi/joiAuth"));
const userschema_1 = __importDefault(require("../models/userschema"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.TOKEN_KEY;
const login = async (req, res) => {
    res.status(403).json({
        msg: "Please login again"
    });
    // res.render("login");
};
exports.login = login;
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
            const token = jsonwebtoken_1.default.sign({ _id: regUser._id.toString() }, secretKey, { expiresIn: '72000000 seconds' });
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
const googleHandler = passport_1.default.authenticate("google", {
    scope: ["profile", "email"],
});
exports.googleHandler = googleHandler;
const logout = async (req, res) => {
    //passport handles logout
    req.logout();
    req.session = null;
    res.clearCookie('jwt');
    res.redirect('/');
};
exports.logout = logout;
const redirectHandler = passport_1.default.authenticate('google', { failureRedirect: `${process.env.REACTURL}/login` });
exports.redirectHandler = redirectHandler;
//redirect after authentication
const redirect = async (req, res) => {
    // res.send(req.user);
    res.redirect('/profile');
};
exports.redirect = redirect;
const getFacebookAuth = () => {
    return passport_1.default.authenticate("facebook", { scope: ['email'] });
};
exports.getFacebookAuth = getFacebookAuth;
const authFacebook = () => {
    return passport_1.default.authenticate("facebook", {
        failureRedirect: `${process.env.REACTURL}/login`
    });
};
exports.authFacebook = authFacebook;
const localAuth = () => {
    return passport_1.default.authenticate('local', {
        failureRedirect: '/auth/login'
    });
};
exports.localAuth = localAuth;
async function loginRedirect(req, res) {
    try {
        const user = req.user;
        const token = jsonwebtoken_1.default.sign({ _id: user._id.toString() }, secretKey, { expiresIn: '72000000 seconds' });
        res.cookie('jwt', token);
        res.status(200).send({
            msg: `Welcome ${user.firstname} ${user.lastname}`,
            user,
            token
        });
    }
    catch (err) {
    }
}
exports.loginRedirect = loginRedirect;
async function ssoRedirect(req, res) {
    try {
        const user = req.user;
        const token = jsonwebtoken_1.default.sign({ _id: user._id.toString() }, secretKey, { expiresIn: '72000000 seconds' });
        res.redirect(`${process.env.REACTURL}/success/${token}~${JSON.stringify(user)}`);
    }
    catch (err) {
    }
}
exports.ssoRedirect = ssoRedirect;
//# sourceMappingURL=auth-controller.js.map