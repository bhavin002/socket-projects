const express = require('express');
const app = express();
var http = require("http").Server(app);
const bodyParser = require("body-parser");
const PORT = 5054;
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

const chatSite = "Bv_Tech";


const getAllConnectedUsers = async () => {
    const connectedUsers = [];
    const sockets = await io.fetchSockets();
    for (const socket of sockets) {
        if (socket.connected && socket.user) {
            connectedUsers.push(socket.user);
        }
    }
    console.log(connectedUsers);
    return connectedUsers;
};

const emitConnectedUsers = async () => {
    const connectedUser = await getAllConnectedUsers();
    io.emit("visitors", connectedUser);
}

io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("add_user", (user) => {
        socket.emit("server_msg", {
            name: "server",
            message: `Welocome To ${chatSite}`
        })

        socket.broadcast.emit("server_msg", {
            name: "server",
            message: `${user} Just Joined Chat!`
        })

        socket.user = user;
        emitConnectedUsers();
    })

    socket.on("message", ({ name, message }) => {
        socket.broadcast.emit("message", {
            name: name,
            message: message
        })
    })

    socket.on('disconnect', async () => {
        console.log('a user disconnected');
        const { user } = socket;
        socket.broadcast.emit("server_msg", {
            name: "server",
            message: `${user} Just Left Chat!`
        })
        emitConnectedUsers();
    });
})

http.listen(PORT, () => {
    console.log(`listening on PORT:${PORT}`);
});