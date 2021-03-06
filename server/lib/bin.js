const db = require('../_config');

exports.activeGameSessions = [];
exports.userSocketList = {};

exports.buildSession = async function (sessionId) {
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
  return (
    db.query(`SELECT * FROM tokens WHERE sessionId = ${sessionId} AND hidden = 0;`)
      .then(([nonHiddenTokens]) => {
        return db.query(joinedQuery)
          .then(([hiddenTokens]) => [...hiddenTokens, ...nonHiddenTokens]);
      })
      .then(allTokens => {
        for (const token of allTokens) {
          token.hidden = Boolean(token.hidden);
        }
        tokens = allTokens;
        return db.query(`SELECT * FROM sessions WHERE sessionId = ${sessionId}`);
      })
      .then(([result]) => {
        return {
          sessionId: result[0].sessionId,
          environmentImageFileName: result[0].environmentImageFileName,
          tokens
        };
      })
      .catch(err => console.error(err))
  );
};
