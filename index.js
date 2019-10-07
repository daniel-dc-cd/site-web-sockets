var express = require('express');
var socket = require('socket.io');

var app = express();
var server = app.listen(8000, function(){
    console.log("Listening on port 8000");
});

//create a folder to store static files
app.use(express.static('public'));

//setup socket
var io = socket(server);

io.on('connection', function(socket){
    console.log("Connected to socket 'connection'", socket.id);
    //chat event handler
    socket.on('chat', function(data){
        //where and what do we do? send it to the clients
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data){
        //broadcast
        socket.broadcast.emit('typing', data); 
    });
});
