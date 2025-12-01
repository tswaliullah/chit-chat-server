const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

// create instance of server
const serverInstance = http.createServer(app);

// create instance of socket.io server
const io = new Server(serverInstance, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// handle socket connection
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // handle join room event
  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`User with ID: ${socket.id} joined room: ${room}`);
  });

  // handle send message event
  socket.on("send_message", (data) => {
    // Broadcast to everyone in the room EXCEPT the sender
    socket.to(data.room).emit("receive_message", data);
  });

  // handle typing event
  socket.on("typing", ({ username, room }) => {
    socket.to(room).emit("user_typing", username);
  });

  // handle disconnect event
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

serverInstance.listen(3000, () => {
  console.log("Server is running on port 3000");
});