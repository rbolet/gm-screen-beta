const router = require('express').Router();
const db = require('../_config');
const SocketIO = require('./socket-io-server');
const justNow = parseInt((Date.now() * 0.001).toFixed(0));
const bin = require('../lib/bin');
const buildSession = bin.buildSession;

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
    tokens (sessionId, imageFileName, tokenName, tokenDetails, hidden)
    VALUES(${reqSessionId}, "${token.imageFileName}", "${token.tokenName}", "${token.tokenDetails}", ${token.hidden})`;

  db.query(insertQuery)
    .then(insertRes => {
      const tokenId = insertRes[0].insertId;
      if (req.body.token.visibleTo.length) {
        const visibleToArray = req.body.token.visibleTo;

        let valuesLine = '';
        for (const index in visibleToArray) {
          const comma = visibleToArray.length > 1 && index < visibleToArray.length - 1 ? ',' : '';
          valuesLine = `${valuesLine} (${tokenId}, ${visibleToArray[index]})${comma}`;
        }
        const visibleToQuery = `INSERT INTO tokenVisibleTo (tokenId, userId) VALUES ${valuesLine};`;
        return db.query(visibleToQuery);
      } else return false;

    }).then(visibleInsertRes => { return buildSession(reqSessionId); })
    .then(session => {
      SocketIO.updateSession(session);
      res.json({ sessionNote: `pushing ${token.tokenName} to session ${session.sessionId}` });
    })
    .catch(error => { next(error); });
});

router.patch('/:sessionId/token', (req, res, next) => {
  const reqSessionId = req.params.sessionId;
  const token = req.body.token;

  const deleteQuery = `DELETE FROM tokenVisibleTo where tokenId = ${token.tokenId};`;
  const updateQuery = `UPDATE tokens
    SET tokenName = "${token.tokenName}", tokenDetails = "${token.tokenDetails}", hidden = ${token.hidden}
    WHERE tokenId = ${token.tokenId};`;

  db.query(updateQuery)
    .then(rowsAffected => { return db.query(deleteQuery); })
    .then(rowsAffected => {
      if (req.body.token.visibleTo.length) {
        const visibleToArray = req.body.token.visibleTo;

        let valuesLine = '';
        for (const index in visibleToArray) {
          const comma = visibleToArray.length > 1 && index < visibleToArray.length - 1 ? ',' : '';
          valuesLine = `${valuesLine} (${token.tokenId}, ${visibleToArray[index]})${comma}`;
        }
        const visibleToQuery = `INSERT INTO tokenVisibleTo (tokenId, userId) VALUES ${valuesLine};`;
        return db.query(visibleToQuery);
      } else return false;
    })
    .then(insertRes => { return buildSession(reqSessionId); })
    .then(session => {
      SocketIO.updateSession(session);
      res.json({ sessionNote: `updating ${token.tokenName} in session ${session.sessionId}` });
    })
    .catch(error => { next(error); });

});

router.delete('/:sessionId/token', (req, res, next) => {
  const reqSessionId = req.params.sessionId;
  const token = req.body.token;

  db.query(`DELETE FROM tokens WHERE tokenId = ${token.tokenId};`)
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

module.exports = router;
