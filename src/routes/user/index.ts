import { Router } from "express";
// import { getUser, loginUser, registUser, checkUser } from "../controllers/user";
// import { certUser } from "../middlewares/user";

const UserRouter = Router();

UserRouter.get("/", async (req, res) => res.send({ success: true }));
// UserRouter.get("/", certUser, getUser);
// UserRouter.put("/", registUser);
// UserRouter.get("/check", certUser, checkUser);
// UserRouter.post("/login", loginUser);

// UserRouter.use("/",testRouter)

export default UserRouter;
