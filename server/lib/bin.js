const db = require('../_config');

exports.activeGameSessions = [];
exports.userSocketList = {};

exports.buildSession = function (sessionId) {
  const tokens = []; const hiddenTokens = [];
  return new Promise(resolve => {
    db.query(`SELECT * FROM tokens WHERE sessionId = ${sessionId}`)
      .then(([rows]) => {
        for (const token of rows) {
          token.hidden = Boolean(token.hidden);
          if (token.hidden) {
            hiddenTokens.push(token);
          } else {
            tokens.push(token);
          }
        }
        return db.query(`SELECT * FROM sessions WHERE sessionId = ${sessionId}`);
      })
      .then(([result]) => {
        return {
          sessionId: result[0].sessionId,
          environmentImageFileName: result[0].environmentImageFileName,
          tokens,
          hiddenTokens
        };
      })
      .then(done => resolve(done));
  });
};
