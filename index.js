var express = require('express');
var socket = require('socket.io');

// App Setup
var app = express();
var server = app.listen(process.env.PORT || 5000)

// Static Files
app.use(express.static('public'));

// Socket Setup
var io = socket(server);
io.on('connection', (socket) => {
  // Handle chat event
  socket.on('chat', function(data){
    io.sockets.emit('chat', data);
  });

  // Handle typing event
  socket.on('typing', function(data){
    socket.broadcast.emit('typing', data);
  });

  // Handle typing stopped event
  socket.on('typingstop', function(){
    socket.broadcast.emit('typingstop');
  });﻿
});
