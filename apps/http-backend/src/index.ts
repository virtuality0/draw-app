import express from "express";
import env from "dotenv";

env.config();

const app = express();

app.listen(process.env.PORT, () => {
  console.log(`Http Server running on port ${process.env.PORT}`);
});
