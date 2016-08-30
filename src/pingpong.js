function pingpong(socket) {
    socket.pingpong = function(name, args, callback) {
        if (typeof args == 'function') {
            callback = args;
            args = undefined;
        }

        this.emit = function(cb) {
            var eventName = 'event_' + new Date().getTime();
            socket.emit(name, eventName, args);
            socket.on(eventName, cb);
        }

        this.on = function(cb) {
            socket.on(name, function(eventName, args) {
                socket.emit(eventName, cb(args))
            });
        }

        if (!callback) {
            return this;
        } else {
            this.emit(callback);
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
