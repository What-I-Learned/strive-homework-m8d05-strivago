import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import {
  notFoundHandler,
  badRequestHandler,
  genericErrorHandler,
  unauthorizedHandler,
  forbiddenHandler,
  catchAllHandler,
} from "./errorHandlers/errorHandlers.js";

const server = express();
const { PORT = 5000 } = process.env.PORT;

// MIDDLEWARES

server.use(cors());
server.use(express.json());

server.use(unauthorizedHandler);
server.use(forbiddenHandler);
server.use(catchAllHandler);
server.use(notFoundHandler);
server.use(badRequestHandler);
server.use(genericErrorHandler);

server.listen(PORT, async () => {
  // connect to mongoose Server
  mongoose.connect(process.env.MONGODB, {});
  console.log(`Server is listening on port ${PORT}`);
});

server.on("error", (error) => {
  console.log("Server is stoppped ", error);
});

