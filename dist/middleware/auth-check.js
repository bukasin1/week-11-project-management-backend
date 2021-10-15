"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedIn = exports.authCheck = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userschema_1 = __importDefault(require("../models/userschema"));
const authCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect('/auth/login');
    }
    else {
        next();
    }
};
exports.authCheck = authCheck;
const secretKey = process.env.TOKEN_KEY;
async function isLoggedIn(req, res, next) {
    if (req.cookies.jwt) {
        const token = req.cookies.jwt;
        if (!token)
            res.status(401).send('Access denied. No token provided.');
        try {
            const decoded = jsonwebtoken_1.default.verify(token, secretKey);
            const user = await userschema_1.default.findOne({ _id: decoded._id });
            req.user = user;
            next();
        }
        catch (ex) {
            res.status(400).send({ error: 'please you have to be Authenticated' });
        }
        return;
    }
    // if user is authenticated in the session, carry on
    if (req.user === 'Non') {
        req.flash('error_message', 'Email already exists');
        return res.redirect('/auth/login');
    }
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/auth/login');
}
exports.isLoggedIn = isLoggedIn;
// export default authCheck;
//# sourceMappingURL=auth-check.js.map