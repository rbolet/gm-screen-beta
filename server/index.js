const express = require('express');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
// const multer = require('multer');
// const uuid = require('uuid/v4');
const bodyParser = require('body-parser');
const sessions = require('./sessions');
// const db = require('./_config');
const io = require('socket.io')(http);
// const fs = require('fs');
// const justNow = parseInt((Date.now() * 0.001).toFixed(0));

const staticPath = path.join(__dirname, 'public');
app.use(sessions);
app.use(bodyParser.json());
app.use(express.static(staticPath));

const userSockets = {};
// let usersConnected = 0;
io.on('connection', socket => {
  userSockets[socket.id] = { socket };
  // usersConnected++;
  socket.emit('connected', socket.id);

  socket.on('disconnect', reason => {
    delete userSockets[socket.id];
    // usersConnected--;
  });

  socket.on('error', error => {
    console.error('Sockect.io error:', error);
  });
});

http.listen(3001, () => {
  // eslint-disable-next-line
  console.log('listening on 3001 ...');
});
