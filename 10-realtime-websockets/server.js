const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app); // Socket.io needs the raw http server, not just Express
const io = new Server(server);

app.use(express.static("public"));

// io.on("connection") fires once PER CLIENT that connects - this is different
// from a normal HTTP route, which fires once per request and then forgets you.
// A WebSocket connection stays open, so both sides can push messages any time.
io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  socket.on("chatMessage", (msg) => {
    console.log(`Message from ${socket.id}: ${msg}`);
    // Broadcast to ALL connected clients (including sender) - this is the
    // "real-time" part: no polling, no refresh, instant delivery.
    io.emit("chatMessage", { id: socket.id, text: msg });
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

const PORT = 3005;
server.listen(PORT, () => console.log(`Chat server running at http://localhost:${PORT}`));
