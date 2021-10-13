"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createActivationToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const createActivationToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, { expiresIn: 60 * 60 });
};
exports.createActivationToken = createActivationToken;
// export const createAccessToken  = (payload: string| object | Buffer)=>{
//   return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {expiresIn: 60 * 60 })
// }
// export const createRefreshToken = (payload: string| object | Buffer)=>{
//   return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {expiresIn: 60 * 60 })
// }
//# sourceMappingURL=Auth.js.map