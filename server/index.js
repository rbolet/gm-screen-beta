const express = require('express');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const bodyParser = require('body-parser');
const sessions = require('./sessions');
// const db = require('./_config');
const SocketIO = require('./routes/socket-io-server');
SocketIO.io(http);
global.rootDirName = __dirname;
// const fs = require('fs');

const staticPath = path.join(__dirname, 'public');
app.use(sessions);
app.use(bodyParser.json());
app.use(express.static(staticPath));
app.use('/config', require('./routes/config'));
app.use('/session', require('./routes/game-session'));
app.use('/campaign', require('./routes/campaign'));

http.listen(3001, () => {
  // eslint-disable-next-line
  console.log('listening on 3001 ...');
});
