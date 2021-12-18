const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const port = process.env.PORT || 8080;
const ip = process.env.IP || "0.0.0.0";
const app = express();

const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "hbs");
app.use("/file", express.static(__dirname + "/public"));
app.use(express.json());
const users = [];

io.on("connection", (socket) => {
  function chatroom(s, u) {
    s.join(socket.id);
    users.push({
      id: socket.id,
      user: u,
    });
    socket.broadcast.emit("online", users);
  }
  socket.on("adduser", (data) => {
    chatroom(socket, data);
  });
  socket.on("msg_send", (data) => {
    if (data.to) {
      io.to(data.to).emit("msg_rcvd", data);
    } else {
      socket.broadcast.emit("msg_rcvd", data);
    }
  });

  socket.on("disconnect", function () {
    for (let x in users) {
      if (users[x].id == socket.id) {
        users.splice(x, 1);
      }
    }
    socket.broadcast.emit("online", users);
  });
});

app.get("/", function (req, res) {
  res.render("index");
});

server.listen(port, ip, function (error) {
  if (error) {
    console.log("error in running the server", error);
  } else {
    console.log(`server is running on the port:${port}`);
  }
});
