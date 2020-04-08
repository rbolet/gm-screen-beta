const router = require('express').Router();
const SocketIO = require('./socket-io-server');

router.post('/socket', (req, res) => {
  const user = req.body.user.userId.length > 3 ? assignId(req.body.user) : req.body.user;
  const note = SocketIO.configSocket(user) ? 'Connection successfully configured'
    : 'There was a problem configuring the connection';
  res.json(['systemNote', note]);

});

function assignId(guestUser) {
  guestUser.userId = guestUser.userRole === 'gm' ? 5 : 6;
  return guestUser;
}

module.exports = router;
