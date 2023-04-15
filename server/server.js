// index.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const connectedUsers = new Set();

io.on('connection', (socket) => {
  console.log('A user connected');

  connectedUsers.add(socket.id);
  io.emit('connectedUsers', Array.from(connectedUsers));

  socket.on('disconnect', () => {
    console.log('A user disconnected');
    connectedUsers.delete(socket.id);
    io.emit('connectedUsers', Array.from(connectedUsers));
  });

  socket.on('message', (message) => {
    io.emit('message', message);
  });
});

server.listen(3001, () => {
  console.log('Server running on port 3001');
});

