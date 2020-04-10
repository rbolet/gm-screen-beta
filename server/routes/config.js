const router = require('express').Router();
const SocketIO = require('./socket-io-server');

router.post('/socket', (req, res) => {
  const user = req.body.user;
  const note = SocketIO.configSocket(user) ? 'Connection successfully configured'
    : 'There was a problem configuring the connection';
  res.json(['systemNote', note]);

});

module.exports = router;
