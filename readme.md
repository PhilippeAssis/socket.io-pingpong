# Socket.io-PingPong

Shortcut to on and emit. Pingpong as you receive the event and returns in the same role.

## Reason:

With socket "emit" I requested and received the data and then to "emit". I decided to reduce the process by creating the PingPong

## Install

`npm install --save socket.io-pingpong`

## Example

### server.js

```javascript
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var pingpong = require('socket.io-pingpong');

server.listen(8888); // you port

app.use('/pingpong.js', pingpong());

io.on('connection', function (socket) {
  var socket = pingpong(socket);

  socket.pp('name').on(function(value) {
        return value + " Assis"
    })

  socket.pp('age').on(function(){    
    return 'Philippe';
  })

});
```

### client.html

```html
<script src="/socket.io/socket.io.js"></script>
<script src="/pingpong.js"></script>

<script type="text/javascript">
var socket = pingpong(io.connect());
  socket.pp('name', 'philippe', function(data) {
            //data is JSON
            console.log(data)//Philippe Assis
        })

  socket.pp('age', function(data) {
            //data is JSON
            console.log(data)//Philippe Assis
        })


</script>
```
