const express = require('express');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
// const multer = require('multer');
// const uuid = require('uuid/v4');
const bodyParser = require('body-parser');
const sessions = require('./sessions');
// const db = require('./_config');
const SocketIO = require('./routes/socket-io-server');
SocketIO.io(http);
// const fs = require('fs');
// const justNow = parseInt((Date.now() * 0.001).toFixed(0));

const staticPath = path.join(__dirname, 'public');
app.use(sessions);
app.use(bodyParser.json());
app.use(express.static(staticPath));
app.use('/config', require('./routes/config'));

http.listen(3001, () => {
  // eslint-disable-next-line
  console.log('listening on 3001 ...');
});
