import { WebSocketServer } from "ws";

const server = new WebSocketServer({
  port: 8080,
});

server.on("connection", function connection(ws) {
  ws.on("message", function message(data) {
    ws.send("listening");
  });
});
