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
  socket.join('Lobby', () => {
    socket.emit('roomChange', 'Lobby');
    updateUserListInRoom('Lobby');
  });
  return socketList[user.socketId].user.userName;
};

function updateUserListInRoom(room) {
  ioServer.in(room).clients((err, clients) => {
    if (err) { console.error(err); return null; }
    const userList = clients.map(socketId => {
      return socketList[socketId].user;
    });
    ioServer.to(room).emit('updateRoomList', userList);
  });
  return room;
}

exports.moveSocketToRoom = (socketId, campaignId) => {
  const socket = socketList[socketId].socket;
  Object.keys(socket.rooms).forEach(room => {
    if (room !== socket.id) {
      socket.leave(room, () => { updateUserListInRoom(room); });
    }
  });
  socket.join(campaignId, () => {
    updateUserListInRoom(campaignId);
    socket.emit('roomChange', campaignId);
  });
};
