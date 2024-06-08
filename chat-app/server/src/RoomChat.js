const express = require('express');
const app = express();
var http = require("http").Server(app);
const bodyParser = require("body-parser");
const PORT = 5052;
var io = require("socket.io")(http, {
    cors: {
        origin: "http://localhost:3000", // client address 
    }
});
require("dotenv").config();
const cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("join_room", (room) => {
        console.log(room);
        socket.join(room);
    })

    socket.on("message", ({ room, message }) => {
        socket.to(room).emit("message", {
            message,
            name: "Friend"
        })
    })

    socket.on("typing", ({ room }) => {
        socket.to(room).emit("typing", "Someone Is Typing");
    })

    socket.on("stopped_typing", ({ room }) => {
        socket.to(room).emit("stopped_typing", "Someone Is Not Typing");
    })

    socket.on('disconnect', async () => {
        console.log('a user disconnected');
    });
})

http.listen(PORT, () => {
    console.log(`listening on PORT:${PORT}`);
});