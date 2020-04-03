const router = require('express').Router();
const db = require('../_config');
const SocketIO = require('./socket-io-server');
const justNow = parseInt((Date.now() * 0.001).toFixed(0));
const activeGameSessions = [];

router.post('/join', (req, res) => {
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

router.post('/:sessionId/environment', (req, res) => {
  const sessionId = req.params.sessionId;

  const fileName = req.body.fileName ? `"${req.body.fileName}"` : null;
  const query = `UPDATE sessions
    SET updated = ${justNow},
      environmentImageFileName = ${fileName}
    WHERE sessionId = ${sessionId};`;

  db.query(query).then(rowsAffected => {
    return buildSession(sessionId);
  })
    .then(session => {
      SocketIO.updateSession(session);
      res.json({ sessionNote: `pushing ${req.body.alias} to session ${session.sessionId}` });
    });
});

router.post('/:sessionId/token', (req, res, next) => {
  const reqSessionId = req.params.sessionId;
  const token = req.body.token;

  const insertQuery = `INSERT INTO
    tokens (sessionId, imageFileName, tokenName, tokenDetails)
    VALUES(${reqSessionId}, "${token.imageFileName}", "${token.tokenName}", "${token.tokenDetails}")`;

  db.query(insertQuery)
    .then(insertRes => {
      return buildSession(reqSessionId);
    })
    .then(session => {
      SocketIO.updateSession(session);
      res.json({ sessionNote: `pushing ${token.tokenName} to session ${session.sessionId}` });
    })
    .catch(error => { next(error); });
});

router.patch('/:sessionId/token', (req, res, next) => {
  const reqSessionId = req.params.sessionId;
  const token = req.body.token;

  const updateQuery = `UPDATE tokens
    SET tokenName = "${token.tokenName}", tokenDetails = "${token.tokenDetails}"
    WHERE tokenId = ${token.tokenId};`;

  db.query(updateQuery)
    .then(rowsAffected => {
      return buildSession(reqSessionId);
    })
    .then(session => {
      SocketIO.updateSession(session);
      res.json({ sessionNote: `updating ${token.tokenName} in session ${session.sessionId}` });
    })
    .catch(error => { next(error); });

});

router.delete('/:sessionId/token', (req, res, next) => {
  const reqSessionId = req.params.sessionId;
  const token = req.body.token;

  db.query(`DELETE FROM tokens WHERE tokenId = ${token.tokenId}`)
    .then(affectedRows => {
      return buildSession(reqSessionId);
    })
    .then(session => {
      SocketIO.updateSession(session);
      res.json({ sessionNote: `Deleting ${token.tokenName} from session ${session.sessionId}` });
    });
});

router.delete('/:sessionId/token/all', (req, res, next) => {
  const reqSessionId = req.params.sessionId;
  db.query(`DELETE FROM tokens WHERE sessionId = ${reqSessionId}`)
    .then(affectedRows => {
      return buildSession(reqSessionId);
    })
    .then(session => {
      SocketIO.updateSession(session);
      res.json({ sessionNote: `Deleting all tokens from session ${session.sessionId}` });
    });
});

function buildSession(sessionId) {
  let tokens = [];
  return new Promise(resolve => {
    db.query(`SELECT * FROM tokens WHERE sessionId = ${sessionId}`)
      .then(([rows]) => {
        tokens = rows;
        return db.query(`SELECT * FROM sessions WHERE sessionId = ${sessionId}`);
      })
      .then(([result]) => {
        return {
          sessionId: result[0].sessionId,
          environmentImageFileName: result[0].environmentImageFileName,
          tokens
        };
      })
      .then(done => resolve(done));
  });
}

module.exports = router;
