import dotenv from "dotenv";
import path from "path";

export function loadConfig() {
  dotenv.config({
    path: path.resolve(process.cwd(), "../../packages/backend-common/.env"),
  });

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing in environment variables");
  }

  if (!process.env.HTTP_BE_PORT) {
    throw new Error("HTTP_BE_PORT is missing in environment variables");
  }

  console.log("[Config] Environment variables loaded successfully.");
}
