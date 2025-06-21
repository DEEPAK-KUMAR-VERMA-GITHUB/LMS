import { Server as SocketIOServer } from "socket.io";
import http from "http";

export const initSocket = (server: http.Server) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    socket.on("disconnect", () => {
      console.log("A user disconnected", socket.id);
    });

    socket.on("notification", (data) => {
      // console.log("Received notification:", data);
      io.emit("newNotification", data);
    });
  });
};
