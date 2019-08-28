/* Module load */
var express = require('express');
var router = express.Router();
var db = require('../config/db');
var auth = require('../lib/auth');

/* Category: carpool page. */
router.get('/', function (req, res, next) {
  res.render('carpool/home', { user: req.user ? req.user : 0 });
});

router.post('/delete', function (req, res, next) {
  if (!auth.isOwner(req, res)) {
    res.render('manage/anonymous', { user: req.user ? req.user : 0 });
  }
  else {
    db.query(
      `SELECT * FROM cal_events WHERE id=?`,
      [req.body.id],
      function (error, result) {
        if (error) throw error;
        if (auth.sameOwner(req, result[0].username) === 0) { // 다른 사용자의 잘못된 접근
          res.render('cheat', { user: req.user ? req.user : 0 });
        }
        else {
          db.query(
            'DELETE FROM cal_events WHERE id = ?',
            [req.body.id],
            function (error, result) {
              if (error) throw error;
              res.redirect('/api/manage/carpool-posts');
            }
          );
        }
      }
    );
  }
});

module.exports = router;