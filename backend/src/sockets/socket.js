import http from "http";
import express from "express";
import { Server } from "socket.io";
import app from "../app.js";
import userModel from "../models/user.model.js";

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST']
  }
})

let userSocket = {} // { userId: socketId }

io.on('connection', (socket) => {
  console.log('user connected:', socket.id);

  const userId = socket.handshake.query.userId;
  if (userId != undefined) {
    userSocket[userId] = socket.id;
  }

  io.emit('getOnlineUsers', Object.keys(userSocket));

  socket.on('disconnect', async() => {
    console.log('user disconnected:', socket.id);

    if (userId) {
      delete userSocket[userId];
      await userModel.findByIdAndUpdate(userId, {
        lastSeen: new Date()
      });
    }

    io.emit('getOnlineUsers', Object.keys(userSocket));
  })
})

export { app, io, server };