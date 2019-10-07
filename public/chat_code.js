//connect to socket.io on the backend

var socket = io.connect('http://localhost:8000');

//get and store the front end comms
var output = document.getElementById('output');
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var feedback = document.getElementById('feedback');

//Emit events

btn.addEventListener('click', function(){
    //send to web front_socket
    socket.emit('chat',{
        message: message.value,
        handle: handle.value
    });
});

message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
});

//Listen for events (incoming messages)

socket.on('chat', function(data){
    feedback.innerHTML = "";
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a msg...</em></p>';
});
