const router = require('express').Router();
const db = require('../_config');
// const SocketIO = require('./socket-io-server');

router.get('/gm/:userId', (req, res) => {
  const gm = req.params.userId;
  const query = `SELECT * FROM campaigns WHERE campaignGM = "${gm}";`;
  db.query(query)
    .then(([campaigns]) => {
      res.status(200).json(campaigns);
    });
});
