import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { getJWTSecret } from "@repo/backend-common/config";

export const auth = (res: Response, req: Request, next: NextFunction) => {
  try {
    const authCookie = req.cookies["Authorization"];
    const token =
      typeof authCookie === "string"
        ? authCookie
        : (authCookie?.toString() ?? "");

    const decoded = jwt.verify(token, getJWTSecret());

    if (
      typeof decoded === "object" &&
      decoded !== null &&
      "userId" in decoded
    ) {
      next();
    } else {
      res.status(401).json({
        msg: "Unauthorized",
      });
    }
  } catch (err) {
    res.status(500).json({
      msg: "Something went wrong, pls try again.",
    });
  }
};
