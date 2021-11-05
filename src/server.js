import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import userRouter from "./users/index.js";
import {
  notFoundHandler,
  badRequestHandler,
  genericErrorHandler,
  unauthorizedHandler,
  forbiddenHandler,
  catchAllHandler,
} from "./errorHandlers/errorHandlers.js";

const server = express();
const { PORT = 3009 } = process.env;


// MIDDLEWARES

server.use(cors());
server.use(express.json());

server.use("/users", userRouter)

server.use(unauthorizedHandler);
server.use(forbiddenHandler);
server.use(catchAllHandler);
server.use(notFoundHandler);
server.use(badRequestHandler);
server.use(genericErrorHandler);



server.listen(PORT, () => {
  // connect to mongoose Server
  console.log(process.env.MONGODB)
  mongoose.connect(process.env.MONGODB);
  console.log(`Server is listening on port ${PORT}`);
});

server.on("error", (error) => {
  console.log("Server is stoppped ", error);
});

