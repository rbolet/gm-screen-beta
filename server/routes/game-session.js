const router = require('express').Router();
const db = require('../_config');
const SocketIO = require('./socket-io-server');
const justNow = parseInt((Date.now() * 0.001).toFixed(0));

router.get('/:campaignId/socket/:socketId', (req, res) => {
  const campaignId = req.params.campaignId;
  const socketId = req.params.socketId;

  db.query(`SELECT sessionId FROM sessions WHERE sessions.campaignId = ${campaignId};`)
    .then(([sessionRes]) => {
      if (sessionRes.length > 0) {
        return sessionRes[0];
      } else {
        return db.query(`INSERT INTO sessions(campaignID, updated) VALUES(${campaignId}, ${justNow});`)
          .then(insertRes => {
            return { sessionId: insertRes[0].insertId };
          });
      }
    })
    .then(result => {
      return buildSession(result.sessionId);
    })
    .then(session => {
      res.json(session);
      return session;
    })
    .then(session => {
      SocketIO.moveSocketToRoom(socketId, session.sessionId);
    });
});

router.post('/environment/:sessionId', (req, res) => {
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

router.post('/token/:sessionId', (req, res, next) => {
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

router.patch('/token/:sessionId', (req, res, next) => {
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

router.delete('/token/:sessionId', (req, res, next) => {
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
