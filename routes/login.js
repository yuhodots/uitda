/* Module load */
var express = require('express');
var router = express.Router();
var db = require('../config/db');
var auth = require('../lib/auth');

/* Password hasher */
var bkfd2Password = require("pbkdf2-password");
var hasher = bkfd2Password();

/* Passport function */
var passport = require('../lib/passport')(router);

/* Category: login page. */
router.get('/', function (req, res, next) {
    if (!auth.isOwner(req, res)) {
        res.render('login/home', { user: req.user ? req.user : 0 });
    }
    else {
        res.render('cheat', { user: req.user ? req.user : 0 });
    }
});

router.post('/',
    passport.authenticate(
        'local',
        {
            successRedirect: '/', // 로그인 성공 시  
            failureRedirect: '/login', // 로그인 실패 시 
            failureFlash: false
        }
    )
);

router.get('/register', function (req, res, next) {
  res.render('login/register', { user: req.user? req.user:0 });
});

router.post('/register', function (req, res, next) {
    hasher(
        { password: req.body.password },
        function (err, pass, salt, hash) {
            var user = {
                authId: 'local:' + req.body.username,
                username: req.body.username,
                password: hash,
                salt: salt,
            };
            db.query(
                'INSERT INTO users SET ?',
                user,
                function (error, result) {
                    if (error) throw error;
                    res.redirect('/');
                });
        }
    );
});

module.exports = router;