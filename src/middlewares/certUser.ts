import { NextFunction, Request, Response } from "express";
// import { generateToken, resolveToken } from "../config/customCrypto";
import logging from "../config/logging";
import { resolveToken } from "../config/crypto";
const NAMESPACE = "middleware/user";
export const certUser = (req: Request, res: Response, next: NextFunction) => {
  const [type, token] = req.headers.authorization?.split(" ") || [,];
  try {
    if (typeof token !== "string" || type !== "Bearer") {
      console.log(token);
      throw {
        status: 401,
        message: "invalid token",
      };
    }
    const { id } = resolveToken(token);
    if (!id) {
      throw {
        status: 401,
        message: "invalid token",
      };
    }
    req.body.iam = id;
    next();
  } catch (err) {
    const error = err as any;
    logging.error(NAMESPACE, error.message);
    return res.status(error.status || 500).json({
      message: error.message,
      data: error.data ? { ...error.data } : {},
    });
  }
};