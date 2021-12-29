import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import http from "http";
import cors from "cors";
import logging from "./config/logging";
import config from "./config/config";
import AppRouter from "./routes";
import Mongoose from "mongoose";
// import { Server as SocketServer, Socket } from "socket.io";s

const NAMESPACE = "server";
const openServer = async () => {
  try {
    await Mongoose.connect(config.mongo.uri);
    logging.info(NAMESPACE, "mongoDB is connected");
    const router = express();
    router.use((req: Request, res: Response, next: NextFunction) => {
      logging.info(
        NAMESPACE,
        `METHOD-[${req.method}], URL-[${req.url}], IP-[${req.socket.remoteAddress}]`,
      );
      res.on("finish", () => {
        logging.info(
          NAMESPACE,
          `METHOD-[${req.method}], URL-[${req.url}], IP-[${req.socket.remoteAddress}], STATUS-[${res.statusCode}]`,
        );
      });
      next();
    });
    router.use(express.json());
    router.use(cookieParser());
    router.use(cors());
    router.use("/", AppRouter);

    const httpServer = http.createServer(router);

    // 소켓 연결 시작

    // const io = new SocketServer(httpServer, {
    //   cors: {
    //     origin: "*",
    //     methods: ["PATCH", "GET", "POST"],
    //   },
    // });

    // io.on("connection", (socket: Socket) => {
    //   logging.info(
    //     "socket".toUpperCase(),
    //     `socket is connected by ${socket.handshake.headers.host}`
    //   );
    //   return "test";
    // });

    httpServer.listen(config.server.port, () => {
      logging.info(
        NAMESPACE,
        `server is running on ${config.server.hostname}:${config.server.port}`,
      );
    });
  } catch (err) {
    const error = err as Error;
    logging.error(NAMESPACE, error.message);
  }
};

openServer();
