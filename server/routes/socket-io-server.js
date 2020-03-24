const socketList = {};
let ioServer;
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

  ioServer = io;
  return io;
};

exports.configSocket = user => {
  socketList[user.socketId].user = user;
  const socket = socketList[user.socketId].socket;
  socket.join('lobby', () => {
    socket.emit('roomChange', 'lobby');
    ioServer.in('lobby').clients((err, clients) => {
      if (err) { console.error(err); return null; }
      const userList = clients.map(socketId => {
        return socketList[socketId].user.userName;
      });
      ioServer.to('lobby').emit('updateRoomList', userList);
      ioServer.to('lobby').emit('playerJoined', `${user.userName} has joined the lobby`);
    });
  });
  return socketList[user.socketId].user.userName;
};
