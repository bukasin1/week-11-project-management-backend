import express, { NextFunction, Request, Response } from "express";
import Joi from "joi";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";



interface RequestInterface extends Request{
  user?: string | JwtPayload
}


function userAuthorization(
  req: RequestInterface,
  res: Response,
  next: NextFunction
) {
  const jwtToken = req.cookies.token || req.headers.token;
  if (!jwtToken) {
    return res.status(401).json({
      status: "Unauthorized user",
      message: "Please login to have access to this app",
    });
  }
  try {
    const userAuthorization = jwt.verify(
      jwtToken.toString(),
      process.env.SECRET_KEY_AUTH as string
    );
    req.user = userAuthorization;
    next();
  } catch (err) {
    res.status(401).json({
      status: "Failed",
      message: "Invalid token",
    });
  }
}


export default userAuthorization;

