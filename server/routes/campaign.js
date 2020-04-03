const router = require('express').Router();
const db = require('../_config');
const buildSession = require('../build-session');
const SocketIO = require('./socket-io-server');
const justNow = parseInt((Date.now() * 0.001).toFixed(0));
const activeGameSessions = [];

router.get('/gm/:userId', (req, res) => {
  const gm = req.params.userId;
  const query = `SELECT * FROM campaigns WHERE campaignGM = "${gm}";`;
  db.query(query)
    .then(([campaigns]) => {
      res.status(200).json(campaigns);
    });
});

router.post('/:campaignId/join', (req, res) => {
  const user = req.body.user;
  const campaign = req.body.campaign;

  db.query(`SELECT sessionId FROM sessions WHERE sessions.campaignId = ${campaign.campaignId};`)
    .then(([sessionRes]) => {
      if (sessionRes.length > 0) {
        return sessionRes[0];
      } else {
        return db.query(`INSERT INTO sessions(campaignID, updated) VALUES(${campaign.campaignId}, ${justNow});`)
          .then(insertRes => {
            return { sessionId: insertRes[0].insertId };
          });
      }
    })
    .then(result => {
      return buildSession(result.sessionId);
    })
    .then(session => {
      let alreadyActive = false;
      for (const activeSession of activeGameSessions) {
        if (activeSession.campaignId === campaign.campaignId) alreadyActive = true;
      }
      if (!alreadyActive) activeGameSessions.push(campaign);
      SocketIO.moveSocketToRoom(user.socketId, session.sessionId);
      res.json(session);
    });
});

module.exports = router;
