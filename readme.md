# Socket.io-PingPong

Shortcut to on and emit. Pingpong as you receive the event and returns in the same role.

## Reason:

With socket "emit" I requested and received the data and then to "emit". I decided to reduce the process by creating the PingPong

## Install

`npm install --save socket.io-pingpong`

## Features

You can use ping pong or pp to call the methods

- **emit(name, args, callback)** Same socket.emit, but returns a given value on the server callback
- **on(name, callback)** socket.on the same as, but performs emit passing to the callback

## Example

### server.js

```javascript
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var pingpong = require('socket.io-pingpong');

server.listen(8888); // you port

app.use(pingpong());

io.on('connection', function(socket) {
    var socket = pingpong(socket);

    socket.pp.on('name', function(value) {
        return value + " Assis";
    })

    socket.pp.emit('age', 27, function(age) {
        console.log('age:', age);
    })

});
```

### client.html

```html
<script src="/socket.io/socket.io.js"></script>
<script src="/pingpong.js"></script>

<script type="text/javascript">
    var socket = pingpong(io.connect());

    socket.pp.emit('name', 'philippe', function(name) {
        console.log('name:', name)
    })


    socket.pp.on('age', function(data) {
        return ++data
    })

</script>
```
