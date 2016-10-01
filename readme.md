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

  socket.pingpong('user_name').on(function(){    
    return 'Philippe';
  })

  socket.pp('user_name').on(function(){    
    return 'Philippe';
  })

});
```
### client.js

```html
<script src="/socket.io/socket.io.js"></script>
<script src="/pingpong.js"></script>

<script type="text/javascript">
var socket = pingpong(io.connect());
  //you can use like this:
  socket.pingpong('user_name', function(data){
    //data is JSON
    console.log(data)
  })
  //or
  socket.pp('user_name', function(data){
    //data is JSON
    console.log(data)
  })
  //or setting emit/on
  socket.pp('user_name').emit(function(data){
    //data is JSON
    console.log(data)
  })

</script>
```
