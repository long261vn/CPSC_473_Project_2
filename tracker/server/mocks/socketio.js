/* eslint-env node */

module.exports = function() {
  var io = require('socket.io')(7100);

  io.on('connection', function (socket) {
        console.log('Connection made on socketIO'); // eslint-disable-line no-console
        socket.on('message', function (data) {console.log(data.x);});

        socket.on('mousemove', function (data) {
            //console.log(data.id);
            socket.broadcast.emit('moving',data);
        });

    });
};
