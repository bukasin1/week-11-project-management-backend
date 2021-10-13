"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function userAuthorization(req, res, next) {
    const jwtToken = req.cookies.token || req.headers.token;
    if (!jwtToken) {
        return res.status(401).json({
            status: "Unauthorized user",
            message: "Please login to have access to this app",
        });
    }
    try {
        const userAuthorization = jsonwebtoken_1.default.verify(jwtToken.toString(), process.env.SECRET_KEY_AUTH);
        req.user = userAuthorization;
        next();
    }
    catch (err) {
        res.status(401).json({
            status: "Failed",
            message: "Invalid token",
        });
    }
}
exports.default = userAuthorization;
//# sourceMappingURL=authorization.js.map