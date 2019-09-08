/* Module load */
var express = require('express');
var router = express.Router();
var auth = require('../lib/auth');

/* Passport function */
var passport = require('../lib/passport')(router);

/* Category: login page. */
module.exports = function(passport){
  router.get('/', function (req, res, next) {
      if (!auth.isOwner(req, res)) {
          res.json('login/home', { user: req.user ? req.user : 0 });
      }
      else {
          res.json('cheat', { user: req.user ? req.user : 0 });
      }
  });
  router.post('/',
      passport.authenticate(
          'local',
          {
              successRedirect: '/api/', // 로그인 성공 시
              failureRedirect: '/api/login', // 로그인 실패 시
              failureFlash: false
          }
      )
  );
  return router;
}
