const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require('socket.io')(http);
const bodyParser = require("body-parser");
const port = 3000;
const userService = require("./services/user.service");

var users = [];

express.static("/");
app.set("view engine", "ejs");
app.use(express.static("assets"));
app.use(bodyParser.urlencoded({ extended: true }));

io.of("/chat")
    .on("connection", function(socket) {
    const user = userService.getUser();
    users.push(user);

    console.log(user.username + " connected");
    socket.username = user.username;
    
    // Emit nickname online
    socket.broadcast.emit('online-send-nickname', user);

    socket.on("chat-message", function(msg) {
        // sending to all clients except sender
        socket.broadcast.emit('chat-message', msg, user);
    });

    socket.on("disconnect", function() {
        console.log(socket.username + " disconnected");

        // Emit nickname offline
        socket.broadcast.emit('offline-send-nickname', user);

        const index = users.findIndex((u) => u.username === socket.username);
        if (index !== -1) {
            users.splice(index, 1);
        }
    });
});

app.get("/", function(req, res) {
    res.render("index", { users: users });
});
  
http.listen(port, function() {
    console.log("Application is listing on port " + port);
});