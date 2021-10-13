"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redirectHandler = exports.redirect = exports.logout = exports.googleHandler = exports.login = void 0;
const passport_1 = __importDefault(require("passport"));
const login = async (req, res) => {
    res.render("login");
};
exports.login = login;
const googleHandler = passport_1.default.authenticate("google", {
    scope: ["profile"],
});
exports.googleHandler = googleHandler;
const logout = async (req, res) => {
    //passport handles logout
    req.logout();
    req.session = null;
    res.redirect('/');
};
exports.logout = logout;
const redirectHandler = passport_1.default.authenticate('google');
exports.redirectHandler = redirectHandler;
//redirect after authentication
const redirect = async (req, res) => {
    // res.send(req.user);
    res.redirect('/profile/');
};
exports.redirect = redirect;
//# sourceMappingURL=auth-controller.js.map