const db = require('../_config');
const SocketIO = require('../routes/socket-io-server');

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
        buildVisibleToList(hiddenTokens);
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
};

function buildVisibleToList(hiddenTokens) {
  hiddenTokens.forEach(token => {
    const groupByQuery = `SELECT userId FROM tokenVisibleTo WHERE tokenId = ${token.tokenId};`;
    db.query(groupByQuery)
      .then(([rows]) => { SocketIO.updateTokenVisibility(token, rows); });
  });
}
