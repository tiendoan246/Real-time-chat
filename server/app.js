const express = require("express");
const app = express();
const http = require("http").Server(app);
var io = require('socket.io')(http);
const bodyParser = require("body-parser");
const port = 3000;
const users = require("./models/user").default;

express.static("/");
app.set("view engine", "ejs");
app.use(express.static("assets"));
app.use(bodyParser.urlencoded({ extended: true }));

io.on("connection", function(socket) {
    console.log("a user connected");
    socket.on("chat-message", function(msg) {
        // sending to all clients except sender
        socket.broadcast.emit('chat-message', msg);
    });
    socket.on("disconnect", function() {
        console.log("user disconnected");
    });
});

app.get("/", function(req, res) {
    res.render("index", { users: users });
});
  
http.listen(port, function() {
    console.log("Application is listing on port " + port);
});