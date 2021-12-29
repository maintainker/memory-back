// P extends core.Params = core.ParamsDictionary, ResBody = any, ReqBody = any, ReqQuery = core.Query> extends core.Request<P, ResBody, ReqBody, ReqQuery>

import { Request, Response } from "express";

export interface CustomRequest<T = undefined> extends Request {
  body: T;
}
// export interface CustomResponse<T> extends Response {
//   data: T;
// }
