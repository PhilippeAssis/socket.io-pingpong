function pingpong(socket) {
    socket.pingpong = {
        emit: function(name, args, callback) {
            var eventName = 'event_' + new Date().getTime();

            socket.emit(name, eventName, args);
            socket.on(eventName, callback);
        },
        on: function(name, callback) {
            socket.on(name, function(eventName, args) {
                socket.emit(eventName, callback(args))
            });
        }
    }

    socket.pp = socket.pingpong;

    return socket;
}

module.exports = function(socket, min) {
    if (socket) {
        return pingpong(socket);
    }
    else {
        var router = require('express').Router()

        router.get('/pingpong.js', function(req, res, next) {
            res.send(pingpong.toString());
            next();
        })
        
        return router

    }
};
