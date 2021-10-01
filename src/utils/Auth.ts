import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const createActivationToken = (payload: string | object | Buffer)=>{
   return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET!, {expiresIn: 60 * 60})
}

// export const createAccessToken  = (payload: string| object | Buffer)=>{
//   return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {expiresIn: 60 * 60 })
// }
// export const createRefreshToken = (payload: string| object | Buffer)=>{
//   return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {expiresIn: 60 * 60 })
// }
