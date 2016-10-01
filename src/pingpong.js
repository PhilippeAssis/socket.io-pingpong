function pingpong(socket) {
    socket.pingpong = function(name, args, callback) {
        if (typeof args == 'function') {
            callback = args;
            args = undefined;
        }

        var fn = {
            emit: function(ar, cb) {
                var eventName = 'event_' + new Date().getTime();
                socket.emit(name, eventName, ar);
                socket.on(eventName, cb);
            },
            on: function(cb) {
                socket.on(name, function(eventName, args) {
                    socket.emit(eventName, cb(args))
                });
            }
        }

        if (!callback) {
            return fn;
        } else {
            fn.emit(args, callbak);
        }
    };

    socket.pp = socket.pingpong;

    return socket;
}


module.exports = function(socket) {
    if (socket) {
        return pingpong(socket);
    } else {
        return function(req, res, next) {
            res.send(pingpong.toString());
            next();
        };
    }
};
