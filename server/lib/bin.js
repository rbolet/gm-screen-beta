const db = require('../_config');

exports.activeGameSessions = [];
exports.userSocketList = {};

exports.buildSession = function (sessionId) {
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
};
