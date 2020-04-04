const bin = require('../lib/bin');
const userSocketList = bin.userSocketList;

let ioServer;

exports.io = function (server) {

  const io = require('socket.io')(server);

  io.on('connection', socket => {
    userSocketList[socket.id] = { socket };
    socket.emit('connected', socket.id);

    socket.on('disconnect', reason => {
      delete userSocketList[socket.id];
    });

    socket.on('error', error => {
      console.error('Sockect.io error:', error);
    });
  });

  ioServer = io;
  return io;
};

exports.configSocket = user => {
  userSocketList[user.socketId].user = user;
  const socket = userSocketList[user.socketId].socket;
  socket.join('Lobby', () => {
    socket.emit('roomChange', 'Lobby');
    updateUserListInRoom('Lobby');
  });
  return userSocketList[user.socketId].user.userName;
};

// moving rooms
function updateUserListInRoom(room) {
  ioServer.in(room).clients((err, clients) => {
    if (err) { console.error(err); return null; }
    const userList = clients.map(socketId => {
      return userSocketList[socketId].user;
    });
    ioServer.to(room).emit('updateRoomList', userList);
  });
  return room;
}

exports.moveSocketToRoom = (socketId, sessionId) => {
  const socket = userSocketList[socketId].socket;
  Object.keys(socket.rooms).forEach(room => {
    if (room !== socket.id) {
      socket.leave(room, () => { updateUserListInRoom(room); });
    }
  });
  socket.join(sessionId, () => {
    updateUserListInRoom(sessionId);
    socket.emit('roomChange', sessionId);
  });
};

// updating state
exports.updateSession = session => {
  ioServer.to(session.sessionId).emit('updateSession', session);
  return session;
};
