import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();

// create http server
const server = http.createServer(app);

// create server of socket
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

// method to build connection
io.on("connection", (socket) => {
  console.log("connected", socket.id);

  //   welcome message to all
  io.emit("welcome", "welcome to chat guys");

  //   message to particular user
  io.emit("welcome", `user connected id ${socket.id}`);

  //   method to build group chat

  //   listen message from client
  socket.on("sendMessage", ({ value, id }) => {
    // console.log(data);

    // method to send data to all user with sender also
    // io.emit("receiveMessage", data);

    // method to send data to a particular user
    io.to(id?.trim()).emit("receiveMessage", value);
  });

  //   build one to one chat

  socket.on("disconnect", () => {
    console.log("disconnected", socket.id);
  });
});

server.listen(8000, () => {
  console.log("server is running");
});
