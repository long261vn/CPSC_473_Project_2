/* eslint-env node */

module.exports = function() {
  var io = require('socket.io')(7100);

  io.on('connection', function (socket) {
        console.log('Connection made on socketIO'); // eslint-disable-line no-console
        //console.log(socket.data);
        /*
        socket.on('message', function () { });
        socket.on('disconnect', function () { });
        */
        socket.on('mousemove', function (data) {
            console.log(data);
            socket.broadcasts.emit('moving',data);
        });
    });
};
