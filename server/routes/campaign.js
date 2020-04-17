/* eslint-disable no-console */
const router = require('express').Router();
const path = require('path');
const db = require('../_config');
const SocketIO = require('./socket-io-server');
const multer = require('multer');
const uuid = require('uuid/v4');
const justNow = parseInt((Date.now() * 0.001).toFixed(0));

const bin = require('../lib/bin');
const activeGameSessions = bin.activeGameSessions;
const buildSession = bin.buildSession;

router.get('/gm/:userId', (req, res) => {
  const gm = req.params.userId;
  const query = `SELECT * FROM campaigns WHERE campaignGM = "${gm}";`;
  db.query(query)
    .then(([campaigns]) => {
      res.status(200).json(campaigns);
    })
    .catch(err => console.error(err));
});

router.get('/player/:userId', (req, res, next) => {
  const activeCampaigns = [];
  if (activeGameSessions.length) {
    console.log('Checking for Active Sessions ...');
    for (const gameSession of activeGameSessions) {
      console.log(`campaign ${gameSession.campaignId} | session ${gameSession.sessionId}`);
      const campaign = {
        campaignId: gameSession.campaignId,
        campaignName: gameSession.campaignName
      };
      activeCampaigns.push(campaign);
    }
  }
  res.status(200).json(activeCampaigns);

});

router.get('/:campaignId/assets', (req, res) => {
  db.query(`SELECT * FROM images
              JOIN campaignImages ON images.imageId = campaignImages.imageId
              WHERE campaignImages.campaignId = ${req.params.campaignId}`)
    .then(([campaignAssets]) => {
      res.status(200).json(campaignAssets).end();
    });
});

router.post('/new', (req, res) => {
  const campaignGM = req.body.userId;
  const campaignName = req.body.campaignName;
  db.query(`INSERT INTO campaigns(campaignGM, campaignName) VALUES(${campaignGM}, "${campaignName}");`)
    .then(insertRes => {
      return db.query(`SELECT * FROM campaigns WHERE campaignId = ${insertRes[0].insertId}`);
    })
    .then(([newCampaign]) => {
      res.json(newCampaign[0]);
    });
});

router.post('/:campaignId/join', (req, res) => {
  const user = req.body.user;
  const campaign = req.body.campaign;
  console.log(`Joining campaign # ${campaign.campaignId} ...`);
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
      console.log('Checking for active game sessions ...');
      for (const activeSession of activeGameSessions) {
        if (activeSession.campaignId === campaign.campaignId) {
          alreadyActive = true;
          console.log(`Match! Campaign # ${campaign.campaignId} already active!`);
        }
      }
      if (!alreadyActive) {
        console.log('No match!');
        if (user.userRole !== 'gm') {
          console.log(`${user.userRole}s cannot start a game session! Throwing 400 ...`);
          res.status(400).json({ from: 'system', message: 'You cannot start a new game session!' });
        }
        console.log(`Pushing campaign #${campaign.campaignId}, session #${session.sessionId}`);
        activeGameSessions.push({ ...campaign, sessionId: session.sessionId });
      }
      SocketIO.moveSocketToRoom(user.socketId, session.sessionId);
      res.json(session);
    });
});

// upload middleware config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(global.rootDirName, '/public/images'));
  },
  filename: (req, file, cb) => {
    const parsed = path.parse(file.originalname);
    cb(null, `${uuid()}.${parsed.ext}`);
  }
});
const upload = multer({ storage: storage });
//

router.post('/upload', upload.single('imageFile'), (req, res, next) => {
  let responseObject = {};
  const insertImageSQL = `INSERT INTO
                            images (filename, alias, category)
                          VALUES ('${req.file.filename}',
                            '${req.body.alias}',
                            '${req.body.category}'
                            )`;
  db.query(insertImageSQL)
    .then(result => {
      responseObject = {
        imageId: result[0].insertId,
        filename: req.file.filename,
        alias: req.body.alias,
        category: req.body.category
      };
      const insertCampaignImageSQL = `INSERT INTO
                                      campaignImages (campaignId, imageId)
                                    VALUES (${req.body.campaignId}, '${result[0].insertId}')`;
      return db.query(insertCampaignImageSQL);

    })
    .then(result => {
      res.status(200).json(responseObject);
    })
    .catch(error => { next(error); });
});

router.delete('/:campaignId', (req, res) => {
  const campaignId = req.params.campaignId;
  db.query(`DELETE FROM campaigns WHERE campaignId = ${campaignId}`)
    .then(rowsAffected => res.json({ confirmNote: `Successfully deleted ${rowsAffected} campaign` }));
});

module.exports = router;
