const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io')

const app = express();
const server = createServer(app);
const io = new Server(server);

const getOnlineUsers = {};

io.on('connection', (socket) => {
    const { username } = socket.handshake.query;
    if (username) {
        getOnlineUsers[username] = socket.id;
    }

    socket.on('newMessage', (message) => {})

    socket.on('disconnect', (reason) => {
        console.log("Disconnected", socket.id);
    })
})



module.exports = { app, server, io, getOnlineUsers };