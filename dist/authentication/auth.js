"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const accessTokenSecrete = 'youraccesstokensecret';
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        // jwt.verify(token, accessTokenSecrete, (err: any, user: any) => {
        //   if (err) {
        //     return res.sendStatus(403);
        //   }
        //   req.user = user;
        //   console.log(user);
        //   next();
        // });
        const decoded = jsonwebtoken_1.default.verify(token, accessTokenSecrete);
        req.user = decoded;
        console.log(decoded);
        next();
    }
    else {
        res.sendStatus(401);
    }
};
exports.default = authenticateJWT;
//# sourceMappingURL=auth.js.map