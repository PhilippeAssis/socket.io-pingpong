var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var pingpong = require('../index.js')

server.listen(process.env.PORT || 8888, function(){
    var port = process.env.PORT || 8888
    console.log(`Run test in ${port}`)
}); 
 
app.use(pingpong());

app.get('/', function (req, res) {
  res.sendFile(__dirname+'/client.html');
});


io.on('connection', function(socket) {
    var socket = pingpong(socket);

    socket.pp.on('name', function(value) {
        return value + " Assis";
    })

    socket.pp.emit('age', 27, function(age) {
        console.log('age:', age);
    })

});