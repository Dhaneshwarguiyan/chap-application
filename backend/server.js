const express = require("express");
const http = require("http");
const app = express();
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server,{
  cors: {
    origin: 'http://localhost:5173', // Replace with your React app's URL
    methods: ['GET', 'POST'],
  },
});
const cookieParser = require('cookie-parser');
const cors = require("cors");
//dotenv config
require("dotenv").config();

//routers
const userRoutes = require("./routes/userRoutes");

//middlewares
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials:true
  })
);
app.use("/api/v1", userRoutes);

io.on("connection", (socket) => {
  console.log(`A user connected ${socket.id}`);

  socket.on("join", ({ userId, receiverId }) => {
    const roomname = [userId, receiverId].sort().join('_');
    socket.join(roomname);
    console.log(`${userId} joined the room`);
  });
  socket.on("private_message", ({ userId, receiverId, data }) => {
    const roomname = [userId, receiverId].sort().join("_");
    socket.to(roomname).emit("send_message", {
      userId: userId,
      data: data,
    });
  });
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is listening on the port ${port}`);
});
