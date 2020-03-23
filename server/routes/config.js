const router = require('express').Router();
const SocketIO = require('./socket-io-server');

router.post('/socket', (req, res) => {
  const user = req.body.user;
  SocketIO.configSocket(user);
});

module.exports = router;
