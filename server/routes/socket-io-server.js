/* eslint-disable no-console */
const bin = require('../lib/bin');
const userSocketList = bin.userSocketList;
const activeGameSessions = bin.activeGameSessions;

let ioServer;

exports.io = function (server) {

  const io = require('socket.io')(server);

  io.on('connection', socket => {
    userSocketList[socket.id] = { socket };
    socket.emit('connected', socket.id);

    socket.on('disconnect', reason => {
      const disconnectingUser = userSocketList[socket.id].user;
      console.log(`${disconnectingUser.userName} disconnected!`);

      const removeActiveSession = new Promise(() => {
        console.log('Checking Active Session list ...');
        for (const campaignIndex in activeGameSessions) {
          console.log(`GM @ index ${campaignIndex}: ${activeGameSessions[campaignIndex].campaignGM}`);
          // eslint-disable-next-line
          if (activeGameSessions[campaignIndex].campaignGM == disconnectingUser.userId) { // Guest userIds are strings!
            const room = activeGameSessions[campaignIndex].sessionId;
            console.log(`${disconnectingUser.userName} is GM of room ${room}!`);
            io.to(room)
              .emit('kick', { message: `${disconnectingUser.userName} has ended the session` });
            ioServer.in(room).clients((err, clients) => {
              clients.forEach(socketId => {
                console.log(`Kicking ${userSocketList[socketId].user.userName} to lobby ...`);
                moveSocketToRoom(socketId, 'lobby');
              });
              if (err) { console.error(err); return null; }
            });
            activeGameSessions.splice(campaignIndex, 1);
          }
        }
      });
      removeActiveSession.then(() => delete userSocketList[socket.id]);

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

function moveSocketToRoom(socketId, sessionId) {
  const socket = userSocketList[socketId].socket;
  const user = userSocketList[socketId].user;

  Object.keys(socket.rooms).forEach(room => {
    if (room !== socket.id) {
      socket.leave(room, () => { updateUserListInRoom(room); });
    }
  });
  // room name === sessionId
  socket.join(sessionId, () => {
    updateUserListInRoom(sessionId);
    socket.emit('roomChange', sessionId);
    ioServer.to(sessionId).emit('info', {
      from: user,
      message: `${user.userName} has entered room ${sessionId}`
    });
  });
}

exports.moveSocketToRoom = moveSocketToRoom;

// updating state
exports.updateSession = session => {
  for (const token of session.tokens) {
    token.hidden = Boolean(token.hidden);
  }
  ioServer.to(session.sessionId).emit('updateSession', session);
  return session;
};
