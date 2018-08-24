const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  fs.readFile("./index.html", "utf-8", (err, content) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(content);
  });
});

const io = require("socket.io").listen(server);

io.sockets.on("connection", socket => {
  // detect new connection
  socket.emit("message", "you just connected");

  //recieving username from the user
  socket.on("username", username => {
    //saving the username
    socket.username = username;
    //send a message to other users
    socket.broadcast.emit("message", socket.username + " has just connected");
  });

  //when receiving a message from a user send it to the other users
  socket.on("message", message => {
    socket.broadcast.emit("message", socket.username + " says: " + message);
  });
});

server.listen(8080);
