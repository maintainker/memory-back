import { Router, Request, Response } from "express";
import UserRouter from "./user";
// import UserRouter from "./user";
// import GameRouter from "./game";
// import RoomRouter from "./room";
// import TestRouter from "./test";

const AppRouter = Router();
AppRouter.get("/", async (req: Request, res: Response) => {
  return res.send({ success: true });
});
AppRouter.use("/user", UserRouter);
// AppRouter.use("/game", GameRouter);
// AppRouter.use("/api", TestRouter);
// AppRouter.use("/room", RoomRouter);

export default AppRouter;
