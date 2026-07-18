import http from "http";
import express from "express";
import { Server } from "socket.io";
import userModel from "../models/user.model.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST']
  }
})

export const getReceiverSocketId = (receiverId) => {
  return userSocket[receiverId];
}

let userSocket = {} // { userId: socketId }

io.on('connection', (socket) => {
  console.log('user connected:', socket.id);

  const userId = socket.handshake.query.userId;
  if (userId != undefined) {
    userSocket[userId] = socket.id;
  }

  io.emit('getOnlineUsers', Object.keys(userSocket));

  socket.on("disconnect", async () => {
    if (userId) {
      delete userSocket[userId];

      const lastSeen = new Date();

      await userModel.findByIdAndUpdate(userId, {
        lastSeen
      });

      io.emit("userOffline", {
        userId,
        lastSeen
      });

      io.emit("getOnlineUsers", Object.keys(userSocket));
    }
  });
})

export { app, io, server };