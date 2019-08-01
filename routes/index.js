/* Module load */
var express = require('express');
var router = express.Router();
var db = require('../config/db');
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var auth = require('../lib/auth');

/* Password hasher */
var bkfd2Password = require("pbkdf2-password");
var hasher = bkfd2Password();

/* AWS SDK, multer-s3 */
let AWS = require("aws-sdk");
AWS.config.loadFromPath(__dirname + "/../config/awsconfig.json");
let s3 = new AWS.S3();

let multer = require("multer");
let multerS3 = require('multer-s3');
let upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "uitda.net",
    key: function (req, file, cb) {
      let extension = path.extname(file.originalname); // 확장자 명 추출
      let basename = path.basename(file.originalname, extension);
      cb(null, `${basename}-${Date.now()}${extension}`);
    },
    acl: 'public-read-write',
    contentType: multerS3.AUTO_CONTENT_TYPE
  })
})

/* Passport */
passport.serializeUser(function (user, done) { // 로그인 성공 시 콜백 함수 호출
  console.log('[SerializeUser]', user);
  done(null, user.authId); // 접속한 사용자의 식별 값이, session store에 user.authId로 저장
});

passport.deserializeUser(function (authId, done) { // 로그인 성공한 사용자가 웹 페이지 이동할 때 마다 콜백 함수 호출
  console.log('[DeserializeUser]', authId); // authId 인자에는 serializeUser 메소드에서 보낸 user.authId 값이 담김
  db.query(
    'SELECT * FROM users WHERE authId=?',
    [authId],
    function (err, results) {
      if (err) done(err); // 유저정보가 mysql 내 존재하지 않는 경우 1 (로그아웃 됨)
      if (!results[0]) done(err); // 유저정보가 mysql 내 존재하지 않는 경우 2 (로그아웃 됨)
      var user = results[0]; // 적절한 유저정보가 존재하는 경우
      done(null, user);
    }
  );
});

passport.use(new LocalStrategy( // Local 저장 방식을 통한 인증 구현
  function (username, password, done) {
    db.query(
      'SELECT * FROM users WHERE authId=?',
      ['local:' + username],
      function (err, results) {
        if (err) return done(err); // 입력한 유저정보가 mysql 내 존재하지 않는 경우 1
        if (!results[0]) return done(err); // 입력한 유저정보가 mysql 내 존재하지 않는 경우 2
        var user = results[0]; // 적절한 유저정보가 존재하는 경우
        return hasher(
          { password: password, salt: user.salt },
          function (err, pass, salt, hash) {
            if (hash === user.password) { // 사용자의 비밀번호가 올바른지 확인
              console.log('LocalStrategy', user);
              done(null, user); // user 라는 값을 passport.serializeUser의 첫번째 인자로 전송
            }
            else done(null, false);
          }
        );
      }
    );
  }
));

/* Category: home page. */
router.get('/', function (req, res, next) {
  console.log(req.user);
  res.render('index', { title: 'Uitda', request: req });
});

/* Category: market page. */
router.get('/market', function (req, res, next) {
  db.query(
    `SELECT * FROM market_board`,
    function (error, results) {
      if (error) throw error;
      res.render('market/home', { postlist: results, request: req });
    }
  )
});

router.get('/market/:id', function (req, res, next) {
  db.query(
    `SELECT * FROM market_board`,
    function (error, results) {
      if (error) throw error;
      db.query(
        `SELECT * FROM market_board WHERE id=?`,
        [req.params.id],
        function (error2, result) {
          if (error2) throw error2;
          db.query(
            `SELECT * FROM market_files WHERE board_id=?`,
            [req.params.id],
            function (error3, files) {
              if (error3) throw error3;
              res.render('market/post', { post: result[0], files: files, request: req });
            });
        })
    }
  );
});

router.post('/market/delete', function (req, res, next) {
  db.query(
    `SELECT * FROM market_files WHERE board_id=?`,
    [req.body.id],
    function (error, files) {
      if (error) throw error;
      for (var i = 0; i < files.length; i++) {
        s3.deleteObject(
          {
            Bucket: "uitda.net",
            Key: files[i].filename
          },
          (err, data) => {
            if (err) throw err;
            console.log(data);
          }
        );
      }
    }
  );
  db.query(
    'DELETE FROM market_files WHERE board_id = ?',
    [req.body.id],
    function (error, result) {
      if (error) throw error;
      db.query(
        'DELETE FROM market_board WHERE id = ?',
        [req.body.id],
        function (error, result) {
          if (error) throw error;
          res.redirect('/manage/market-posts');
        }
      );
    }
  );
});

/* Category: networking page. */
router.get('/networking', function (req, res, next) {
  db.query(
    `SELECT * FROM networking_board`,
    function (error, results) {
      if (error) throw error;
      res.render('networking/home', { postlist: results, request: req });
    }
  )
});

router.get('/networking/:id', function (req, res, next) {
  db.query(
    `SELECT * FROM networking_board`,
    function (error, results) {
      if (error) throw error;
      db.query(
        `SELECT * FROM networking_board WHERE id=?`,
        [req.params.id],
        function (error2, result) {
          if (error2) throw error2;
          db.query(
            `SELECT * FROM networking_files WHERE board_id=?`,
            [req.params.id],
            function (error3, files) {
              if (error3) throw error3;
              res.render('networking/post', { post: result[0], files: files, request: req });
            });
        })
    }
  )
});

router.post('/networking/delete', function (req, res, next) {
  db.query(
    `SELECT * FROM networking_files WHERE board_id=?`,
    [req.body.id],
    function (error, files) {
      if (error) throw error;
      for (var i = 0; i < files.length; i++) {
        s3.deleteObject(
          {
            Bucket: "uitda.net",
            Key: files[i].filename
          },
          (err, data) => {
            if (err) throw err;
            console.log(data);
          }
        );
      }
    }
  );
  db.query(
    'DELETE FROM networking_files WHERE board_id = ?',
    [req.body.id],
    function (error, result) {
      if (error) throw error;
      db.query(
        'DELETE FROM networking_board WHERE id = ?',
        [req.body.id],
        function (error, result) {
          if (error) throw error;
          res.redirect('/manage/networking-posts');
        }
      );
    }
  );
});

/* Category: carpool page. */
router.get('/carpool', function (req, res, next) {
  res.render('carpool/home', { request: req });
});

/* Category: manage page. */
router.get('/manage', function (req, res, next) {
  if (!auth.isOwner(req, res)) {
    res.render('manage/anonymous', { request: req });
  }
  else {
    res.render('manage/home', { request: req });
  }
});

router.get('/manage/market-posts', function (req, res, next) {
  if (!auth.isOwner(req, res)) {
    res.render('manage/anonymous', { request: req });
  }
  else {
    if (auth.hasPost(req,'market_board') === 0) { // 작성한 게시글이 데이터가 없는 경우
      res.render('manage/market-posts', { postlist: undefined, request: req });
    }
    else {
      db.query(
        `SELECT * FROM market_board WHERE author='${req.user.username}'`,
        function (error, results) {
          if (error) throw error;
          res.render('manage/market-posts', { postlist: results, request: req });
        }
      )
    }
  }
});

router.get('/manage/market-posts/create', function (req, res, next) {
  if (!auth.isOwner(req, res)) {
    res.render('manage/anonymous', { request: req });
  }
  else {
    res.render('manage/market-posts_create', { request: req });
  }
});

router.post('/manage/market-posts/create', upload.array('userfile', 6), function (req, res, next) {
  if (!auth.isOwner(req, res)) {
    res.render('manage/anonymous', { request: req });
  }
  else {
    var title = req.body.title;
    var description = req.body.description;
    var files = req.files;

    db.query(
      `INSERT INTO market_board (title, description, author, created, filenum, count) VALUES(?, ?, '${req.user.username}', NOW(), ${files.length}, 0)`,
      [title, description],
      function (error, result) {
        if (error) throw error;
      }
    )
    for (var i = 0; i < files.length; i++) {
      db.query(
        `INSERT INTO market_files (board_id, file_id, filename, location) VALUES(LAST_INSERT_ID(), ?, ?, ?)`,
        [i, files[i].key, files[i].location],
        function (error, result) {
          if (error) throw error;
        }
      )
    }
    res.redirect('/manage/market-posts');
  }
});

router.get('/manage/market-posts/update/:id', function (req, res, next) {
  if (!auth.isOwner(req, res)) {
    res.render('manage/anonymous', { request: req });
  }
  else {
    db.query(
      `SELECT * FROM market_board`,
      function (error, results) {
        if (error) throw error;
        db.query(
          `SELECT * FROM market_board WHERE id=?`,
          [req.params.id],
          function (error2, result) {
            if (error2) throw error2;
            else {
              if (auth.sameOwner(req, result[0].author) === 0) { // 다른 사용자의 잘못된 접근
                res.render('cheat', { request: req });
              }
              else { // 올바른 사용자의 접근
                res.render('manage/market-posts_update', { post: result[0], request: req });
              }
            }
          })
      }
    )
  }
});

router.post(`/manage/market-posts/update/:id`, function (req, res, next) {
  // 아직 파일 수정 구현은 하지 않았습니다.

  var title = req.body.title;
  var description = req.body.description;
  var id = req.body.id;
  db.query(
    'UPDATE market_board SET title=?, description=? WHERE id=?',
    [title, description, id],
    function (error, result) {
      if (error) throw error;
      res.redirect(`/market/${id}`);
    }
  )
});

router.get('/manage/networking-posts', function (req, res, next) {
  if (!auth.isOwner(req, res)) {
    res.render('manage/anonymous', { request: req });
  }
  else {
    if (auth.hasPost(req,'networking_board') === 0) { // 작성한 게시글이 데이터가 없는 경우
      res.render('manage/networking-posts', { postlist: undefined, request: req });
    }
    else {
      db.query(
        `SELECT * FROM networking_board WHERE author='${req.user.username}'`,
        function (error, results) {
          if (error) throw error;
          res.render('manage/networking-posts', { postlist: results, request: req });
        }
      )
    }
  }
});

router.get('/manage/networking-posts/create', function (req, res, next) {
  if (!auth.isOwner(req, res)) {
    res.render('manage/anonymous', { request: req });
  }
  else {
    res.render('manage/networking-posts_create', { request: req });
  }
});

router.post('/manage/networking-posts/create', upload.array('userfile', 6), function (req, res, next) {
  if (!auth.isOwner(req, res)) {
    res.render('manage/anonymous', { request: req });
  }
  else {
    var title = req.body.title;
    var description = req.body.description;
    var files = req.files;

    db.query(
      `INSERT INTO networking_board (title, description, author, created, filenum, count) VALUES(?, ?, '${req.user.username}', NOW(), ${files.length}, 0)`,
      [title, description],
      function (error, result) {
        if (error) throw error;
      }
    )
    for (var i = 0; i < files.length; i++) {
      db.query(
        `INSERT INTO networking_files (board_id, file_id, filename, location) VALUES(LAST_INSERT_ID(), ?, ?, ?)`,
        [i, files[i].key, files[i].location],
        function (error, result) {
          if (error) throw error;
        }
      )
    }
    res.redirect('/manage/networking-posts');
  }
});

router.get('/manage/networking-posts/update/:id', function (req, res, next) {
  if (!auth.isOwner(req, res)) {
    res.render('manage/anonymous', { request: req });
  }
  else {
    db.query(
      `SELECT * FROM networking_board`,
      function (error, results) {
        if (error) throw error;
        db.query(
          `SELECT * FROM networking_board WHERE id=?`,
          [req.params.id],
          function (error2, result) {
            if (error2) throw error2;
            else {
              if (auth.sameOwner(req, result[0].author) === 0) { // 다른 사용자의 잘못된 접근
                res.render('cheat', { request: req });
              }
              else { // 올바른 사용자의 접근
                res.render('manage/networking-posts_update', { post: result[0], request: req });
              }
            }
          })
      }
    )
  }
});

router.post(`/manage/networking-posts/update/:id`, function (req, res, next) {

  // 아직 파일 수정 구현은 하지 않았습니다.

  var title = req.body.title;
  var description = req.body.description;
  var id = req.body.id;
  db.query(
    'UPDATE networking_board SET title=?, description=? WHERE id=?',
    [title, description, id],
    function (error, result) {
      if (error) throw error;
      res.redirect(`/networking/${id}`);
    }
  )

});

router.get('/manage/carpool-posts', function (req, res, next) {
  if (!auth.isOwner(req, res)) {
    res.render('manage/anonymous', { request: req });
  }
  else {
    res.render('manage/carpool-posts', { request: req });
  }
});

router.get('/manage/carpool-posts/create', function (req, res, next) {
  if (!auth.isOwner(req, res)) {
    res.render('manage/anonymous', { request: req });
  }
  else {
    res.render('manage/carpool-posts_create', { request: req });
  }
});

router.post('/manage/carpool-posts/create', function (req, res, next) {
  if (!auth.isOwner(req, res)) {
    res.render('manage/anonymous', { request: req });
  }
  else {
    //아직 처리하지 않았습니다.
    res.redirect('/manage/carpool-posts');
  }
});

router.get('/manage/proposal', function (req, res, next) {
  if (!auth.isOwner(req, res)) {
    res.render('manage/anonymous', { request: req });
  }
  else {
    res.render('manage/proposal', { request: req });
  }
});

router.get('/manage/proposal/create', function (req, res, next) {
  if (!auth.isOwner(req, res)) {
    res.render('manage/anonymous', { request: req });
  }
  else {
    res.render('manage/proposal_create', { request: req });
  }
});

router.post('/manage/proposal/create', function (req, res, next) {
  if (!auth.isOwner(req, res)) {
    res.render('manage/anonymous', { request: req });
  }
  else {
    //아직 처리하지 않았습니다.
    res.redirect('/manage/proposal');
  }
});

router.get('/manage/leave', function (req, res, next) {
  if (!auth.isOwner(req, res)) {
    res.render('manage/anonymous', { request: req });
  }
  else {
    res.render('manage/leave', { request: req });
  }
});

/* Category: chatting page. */
router.get('/chatting', function (req, res, next) {
  if (!auth.isOwner(req, res)) {
    res.render('chatting/anonymous', { request: req });
  }
  else {
    res.render('chatting/home', { request: req });
  }
});

/* Category: login page. */
router.get('/login', function (req, res, next) {
  if (!auth.isOwner(req, res)) {
    res.render('login/home', { request: req });
  }
  else {
    res.render('cheat', { request: req });
  }
});

router.post('/login',
  passport.authenticate(
    'local',
    {
      successRedirect: '/', // 로그인 성공 시  
      failureRedirect: '/login', // 로그인 실패 시 
      failureFlash: false
    }
  )
);

router.get('/login/register', function (req, res, next) {
  res.render('login/register', { request: req });
});

router.post('/login/register', function (req, res, next) {
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

router.get('/logout', function (req, res) {
  req.logout();
  req.session.save(function () {
    res.redirect('/');
  });
});

module.exports = router;
