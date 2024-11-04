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
const cors = require("cors");
//dotenv config
require("dotenv").config();

//routers
const userRoutes = require("./routes/userRoutes");

//middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use("/api/v1", userRoutes);

io.on("connection", (socket) => {
  console.log(`A user connected ${socket.id}`);

  socket.on("join", ({ username, receiver }) => {
    const roomname = [username, receiver].sort().join('_');
    socket.join(roomname);
    console.log(`${username} joined the room`);
  });
  socket.on("private_message", ({ username, receiver, data }) => {
    const roomname = [username, receiver].sort().join("_");
    socket.to(roomname).emit("send_message", {
      username: username,
      data: data,
    });
  });
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is listening on the port ${port}`);
});
