import { Request, Response, NextFunction } from "express";
import { Error } from "mongoose";
import logging from "../../../config/logging";
import { hashEncrypt, generateToken } from "../../../config/crypto";
import { findUserbyEmail } from "../../../service/user";
import { signinInput } from "../../../service/user/user.dtos";
import { CustomRequest } from "../../../@types/default.body";
const NAMESPACE = "user/controller";

const loginUser = async (req: CustomRequest<signinInput>, res: Response) => {
  const { email, password } = req.body;
  try {
    // const user = await findUserKakao(snsId);
    const user = await findUserbyEmail(email);
    console.log;
    if (!user) {
      throw {
        message: "없는 유저이거나 이메일이 틀렸습니다.",
      };
    }
    const encrypted = await hashEncrypt(password);
    if (user.password !== encrypted) {
      throw {
        message: "비밀번호가 일치하지 않습니다.",
      };
    }
    const access = generateToken({
      id: user._id,
    });
    // res.cookie("refreshToken", refresh, { maxAge: 1800, httpOnly: true });
    return res.send({ access, name: user.name });
  } catch (err) {
    const error = err as Error;
    logging.error(NAMESPACE, error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
};

export default loginUser;
