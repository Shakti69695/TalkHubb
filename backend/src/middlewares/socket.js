import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173/"],
    credentials: true,
  },
});

const userSocketMap = {};

// Function to get receiver socket ID
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userID;

  if (userId) userSocketMap[userId] = socket.id;

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
  });
});

// Export necessary variables and functions
export { io, app, server };
