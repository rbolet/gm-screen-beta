const router = require('express').Router();
const db = require('./_config');
const justNow = parseInt((Date.now() * 0.001).toFixed(0));

router.get('/:campaignId', (req, res) => {
  const campaignId = req.params.campaignId;

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
