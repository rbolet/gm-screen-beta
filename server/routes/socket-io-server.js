const socketList = {};
exports.sockets = socketList;

exports.io = function (server) {

  const io = require('socket.io')(server);

  io.on('connection', socket => {
    socketList[socket.id] = { socket };
    socket.emit('connected', socket.id);

    socket.on('disconnect', reason => {
      delete socketList[socket.id];
    });

    socket.on('error', error => {
      console.error('Sockect.io error:', error);
    });
  });

  return io;
};
