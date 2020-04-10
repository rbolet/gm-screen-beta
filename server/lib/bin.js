const db = require('../_config');

exports.activeGameSessions = [];
exports.userSocketList = {};

exports.buildSession = function (sessionId) {
  const joinedQuery = `SELECT tokenId,
                              sessionId,
                              imageFileName,
                              tokenName,
                              tokenDetails,
                              hidden,
                              JSON_ARRAYAGG(userId) AS visibleTo
                      FROM (SELECT tokens.tokenId AS tokenId,
                              sessionId,
                              imageFileName,
                              tokenName,
                              tokenDetails,
                              hidden,
                              userId FROM tokens
                            JOIN tokenVisibleTo ON tokens.tokenId = tokenVisibleTo.tokenId) AS combined
                      WHERE combined.sessionId = ${sessionId}
                      GROUP BY tokenId;`;

  let tokens = [];
  return new Promise(resolve => {
    db.query(`SELECT * FROM tokens WHERE sessionId = ${sessionId} AND hidden = 0;`)
      .then(([nonHiddenTokens]) => {
        db.query(joinedQuery)
          .then(([hiddenTokens]) => {
            tokens = [...hiddenTokens, ...nonHiddenTokens];
            for (const token of tokens) {
              token.hidden = Boolean(token.hidden);
            }
          });
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
