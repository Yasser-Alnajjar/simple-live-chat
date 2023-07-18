const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: { origin: "*" },
});
let users = {};
io.on("connection", (socket) => {
  socket.on("user", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("user-connected", name);
  });
  // socket.emit("message", "data");
  socket.on("send-message", (msg) => {
    io.sockets.emit("message", { msg: msg, name: users[socket.id] });
  });
});
server.listen(5000, () =>
  console.log("server listen to http://localhost:5000")
);
