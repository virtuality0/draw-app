import { WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { getJWTSecret } from "@repo/backend-common/config";

const server = new WebSocketServer({
  port: 8080,
});

server.on("connection", function connection(ws, request) {
  //const cookies = cookie.parse(request.headers.cookie ?? "");
  // const token =
  //   typeof authCookie === "string"
  //     ? authCookie
  //     : (authCookie?.toString() ?? "");
  //
  // const decoded = jwt.verify(token, JWT_SECRET());
  //
  // if ((typeof decoded === "object" && decoded === null) || "email" in decoded) {
  // } else {
  //   ws.close();
  //   return;
  // }

  ws.on("message", function message(data) {
    ws.send("listening");
  });
});
