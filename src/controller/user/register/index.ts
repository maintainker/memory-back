import { Request, Response } from "express";
import logging from "../../../config/logging";
import { findUserbyId, createUser } from "../../../service/user";
import { generateToken, hashEncrypt } from "../../../config/crypto";
import { CustomRequest } from "../../../@types/default.body";
import { registerInput } from "../../../service/user/user.dtos";
const NAMESPACE = "user/controller";
//P extends core.Params = core.ParamsDictionary, ResBody = any, ReqBody = any, ReqQuery = core.Query> extends core.Request<P, ResBody, ReqBody, ReqQuery
const registUser = async (req: CustomRequest<registerInput>, res: Response) => {
  const { email, password, name } = req.body;
  try {
    const isUser = await findUserbyId(email);
    if (isUser) {
      throw {
        message: "동일한 아이디로 가입이 되어있습니다.",
      };
    }
    const encrypted = await hashEncrypt(password);
    const user = await createUser({ email, password: encrypted, name });
    const access = generateToken({ id: user._id });
    return res.send({
      access,
      name,
    });
  } catch (err) {
    const error = err as any;
    logging.error(NAMESPACE, error.message);
    return res
      .status(error.status || 500)
      .json({ success: false, message: error.message });
  }
};

export default registUser;
