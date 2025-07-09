import { loadConfig } from "@repo/backend-common/loadConfig";
loadConfig(); // load config .env variablees
import { getHttpPort } from "@repo/backend-common/config";
import express from "express";
import cookieParser from "cookie-parser";
import { userRouter } from "./routers/user";

const app = express();
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1/user", userRouter);

app.listen(getHttpPort(), () => {
  console.log(`Http Server running on port ${getHttpPort()}`);
});
