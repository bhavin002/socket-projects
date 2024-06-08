const express = require('express');
const app = express();
var http = require("http").Server(app);
const bodyParser = require("body-parser")
const PORT = 5050;
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


const getAllConnectedUsers = async () => {
    const connectedUsers = [];
    const sockets = await io.fetchSockets();
    for (const socket of sockets) {
        if (socket.connected && socket.user) {
            connectedUsers.push(socket.user);
        }
    }
    return connectedUsers;
};

const emitConnectedUsers = async () => {
    const connectedUser = await getAllConnectedUsers();
    io.emit("visitors", connectedUser);
}


io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("new_visitor", async (user) => {
        console.log("new_visitor", user);
        socket.user = user
        emitConnectedUsers();
    })


    socket.on('disconnect', async () => {
        console.log('a user disconnected');
        emitConnectedUsers();
    });
})

http.listen(PORT, () => {
    console.log(`listening on PORT:${PORT}`);
});