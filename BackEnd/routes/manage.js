/* Module load */
let express = require('express');
let router = express.Router();
let db = require('../config/db');
let auth = require('../lib/auth');
const { market_board } = require('../models');
const { networking_board } = require('../models');
const { proposal } = require('../models');
//const { cal_events } = require('../models');
let moment = require('moment');
moment.locale('ko');


/* manage page. */
router.get('/', function (req, res) {
  res.json({ user: req.user ? req.user : 0 });
});

/* market-posts */
router.get('/market', function (req, res) {
  (!auth.isOwner(req, res)) ?
    res.json({ user: req.user ? req.user : 0 }) :
    (auth.hasPost(req, 'market_board', 'email') === 0) ?
      res.json({ postlist: undefined, user: req.user ? req.user : 0 }) :
      market_board.findAll({ 
        where: { email: req.user.email },
        order: [[ 'id','DESC' ]]
      }).then(result => {
        res.json({ postlist: result, user: req.user ? req.user : 0 });
      }).catch(function (err) { throw err; });
});

/* networking-posts */
router.get('/networking', function (req, res) {
  (!auth.isOwner(req, res)) ?
    res.json({ user: req.user ? req.user : 0 }) :
    (auth.hasPost(req, 'networking_board', 'email') === 0) ?
      res.json({ postlist: undefined, user: req.user ? req.user : 0 }) :
      networking_board.findAll({ 
        where: { email: req.user.email },
        order: [[ 'id','DESC' ]]
      }).then(function (result) {
        res.json({ postlist: result, user: req.user ? req.user : 0 });
      }).catch(function (err) { throw err; });
});

/* carpool-posts */
router.get('/carpool', function (req, res) {
  (!auth.isOwner(req, res)) ?
    res.json({ user: req.user ? req.user : 0 }) :
    (auth.hasPost(req, 'cal_events', 'email') === 0) ?
      res.json({ postlist: undefined, user: req.user ? req.user : 0 }) :
      db.query(
        `SELECT * FROM cal_events WHERE email='${req.user.email}'`,
        function (error, results) {
          if (error) throw error;
          res.json({ events: results, user: req.user ? req.user : 0 });
        }
      )
});

/* proposal */
router.get('/proposal', function (req, res) {
  res.json({ user: req.user ? req.user : 0 });
});

router.get('/proposal/create', function (req, res) {
  res.json({ user: req.user ? req.user : 0 });
});

router.post('/proposal/create', function (req, res) {
  let title = req.body.title;
  let description = req.body.description;
  (!auth.isOwner(req, res)) ?
    res.json({ user: req.user ? req.user : 0 }) :
    proposal.create({ title: title, description: description, author: req.user.username, email: req.user.email }).then(function () {
      res.redirect('/api/manage/proposal');
    }).catch(function (err) { throw err; });
});

module.exports = router;
