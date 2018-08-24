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
  console.log("A client is connected !");
});

server.listen(8080);
