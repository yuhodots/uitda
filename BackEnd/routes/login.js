/* Module load */
var express = require('express');
var router = express.Router();

/* Category: login page. */
module.exports = function(passport){
  router.get('/', function (req, res) {
    res.json({ user: req.user ? req.user : 0 })
  });
  router.post('/',
      passport.authenticate(
          'local',
          {
              successRedirect: 'http://localhost:4000/', // 로그인 성공 시
              failureRedirect: '/api/login', // 로그인 실패 시
              failureFlash: false
          }
      )
  );
  return router;
}
