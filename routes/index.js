var express = require('express');
var router = express.Router();
var sanitizeHtml = require('sanitize-html');
var db = require('../lib/db');
var path = require('path');

/* AWS SDK */
let AWS = require("aws-sdk");
AWS.config.loadFromPath(__dirname + "/../lib/awsconfig.json");
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

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Uitda' });
});

/* GET market page. */
router.get('/market', function (req, res, next) {
  db.query(
    `SELECT * FROM market_board`,
    function (error, results) {
      if (error) {
        throw error;
      }
      res.render('market/home', { postlist: results });
    }
  )
});

router.get('/market/:id', function (req, res, next) {
  db.query(
    `SELECT * FROM market_board`,
    function (error, results) {
      if (error) {
        throw error;
      }
      db.query(
        `SELECT * FROM market_board WHERE id=?`,
        [req.params.id],
        function (error2, result) {
          if (error2) {
            throw error2;
          }
          db.query(
            `SELECT * FROM market_files WHERE board_id=?`,
            [req.params.id],
            function (error3, files) {
              if (error3) {
                throw error3;
              }
              res.render('market/post', { post: result[0], files: files });
            });
        })
    }
  );
});

router.post('/market/delete', function (req, res, next) {
  //이미지 파일 삭제는 아직 구현하지 않았습니다. 
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

/* GET networking page. */
router.get('/networking', function (req, res, next) {
  db.query(
    `SELECT * FROM networking_board`,
    function (error, results) {
      if (error) {
        throw error;
      }
      res.render('networking/home', { postlist: results });
    }
  )
});

router.get('/networking/:id', function (req, res, next) {
  db.query(
    `SELECT * FROM networking_board`,
    function (error, results) {
      if (error) {
        throw error;
      }
      db.query(
        `SELECT * FROM networking_board WHERE id=?`,
        [req.params.id],
        function (error2, result) {
          if (error2) {
            throw error2;
          }
          db.query(
            `SELECT * FROM networking_files WHERE board_id=?`,
            [req.params.id],
            function (error3, files) {
              if (error3) {
                throw error3;
              }
              res.render('networking/post', { post: result[0], files: files });
            });
        })
    }
  )
});

router.post('/networking/delete', function (req, res, next) {
  //이미지 파일 삭제는 아직 구현하지 않았습니다. 
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

/* GET carpool page. */
router.get('/carpool', function (req, res, next) {
  res.render('carpool/home');
});

/* GET & POST manage page. */
router.get('/manage', function (req, res, next) {
  res.render('manage/home');
});

router.get('/manage/market-posts', function (req, res, next) {
  db.query(
    `SELECT * FROM market_board`,
    function (error, results) {
      if (error) {
        throw error;
      }
      res.render('manage/market-posts', { postlist: results });
    }
  )
});

router.get('/manage/market-posts/create', function (req, res, next) {
  res.render('manage/market-posts_create');
});

router.post('/manage/market-posts/create', upload.array('userfile', 6), function (req, res, next) {
  var title = req.body.title;
  var description = req.body.description;
  var files = req.files;

  db.query(
    `INSERT INTO market_board (title, description, author, created, filenum, count) VALUES(?, ?, 'yuho', NOW(), 0, 0)`,
    [title, description],
    function (error, result) {
      if (error) {
        throw error;
      }
    }
  )
  for (var i = 0; i < files.length; i++) {
    db.query(
      `INSERT INTO market_files (board_id, file_id, filename, location) VALUES(LAST_INSERT_ID(), ?, ?, ?)`,
      [i, files[i].key, files[i].location],
      function (error, result) {
        if (error) {
          throw error;
        }
      }
    )
  }
  res.redirect('/manage/market-posts');
});

router.get('/manage/market-posts/update/:id', function (req, res, next) {
  db.query(
    `SELECT * FROM market_board`,
    function (error, results) {
      if (error) {
        throw error;
      }
      db.query(
        `SELECT * FROM market_board WHERE id=?`,
        [req.params.id],
        function (error2, result) {
          if (error2) {
            throw error2;
          }
          res.render('manage/market-posts_update', { post: result[0] });
        })
    }
  )
});

router.post(`/manage/market-posts/update/:id`, function (req, res, next) {
  var title = req.body.title;
  var description = req.body.description;
  var id = req.body.id;
  db.query(
    'UPDATE market_board SET title=?, description=? WHERE id=?',
    [title, description, id],
    function (error, result) {
      if (error) {
        throw error;
      }
      res.redirect(`/market/${id}`);
    }
  )
});

router.get('/manage/networking-posts', function (req, res, next) {
  db.query(
    `SELECT * FROM networking_board`,
    function (error, results) {
      if (error) {
        throw error;
      }
      res.render('manage/networking-posts', { postlist: results });
    }
  )
});

router.get('/manage/networking-posts/create', function (req, res, next) {
  res.render('manage/networking-posts_create');
});

router.post('/manage/networking-posts/create', upload.array('userfile', 6), function (req, res, next) {
  var title = req.body.title;
  var description = req.body.description;
  var files = req.files;

  db.query(
    `INSERT INTO networking_board (title, description, author, created, filenum, count) VALUES(?, ?, 'yuho', NOW(), 0, 0)`,
    [title, description],
    function (error, result) {
      if (error) {
        throw error;
      }
    }
  )
  for (var i = 0; i < files.length; i++) {
    db.query(
      `INSERT INTO networking_files (board_id, file_id, filename, location) VALUES(LAST_INSERT_ID(), ?, ?, ?)`,
      [i, files[i].key, files[i].location],
      function (error, result) {
        if (error) {
          throw error;
        }
      }
    )
  }
  res.redirect('/manage/networking-posts');
});

router.get('/manage/networking-posts/update/:id', function (req, res, next) {
  db.query(
    `SELECT * FROM networking_board`,
    function (error, results) {
      if (error) {
        throw error;
      }
      db.query(
        `SELECT * FROM networking_board WHERE id=?`,
        [req.params.id],
        function (error2, result) {
          if (error2) {
            throw error2;
          }
          res.render('manage/networking-posts_update', { post: result[0] });
        })
    }
  )
});

router.post(`/manage/networking-posts/update/:id`, function (req, res, next) {
  var title = req.body.title;
  var description = req.body.description;
  var id = req.body.id;
  db.query(
    'UPDATE networking_board SET title=?, description=? WHERE id=?',
    [title, description, id],
    function (error, result) {
      if (error) {
        throw error;
      }
      res.redirect(`/networking/${id}`);
    }
  )
});

router.get('/manage/carpool-posts', function (req, res, next) {
  res.render('manage/carpool-posts');
});

router.get('/manage/carpool-posts/create', function (req, res, next) {
  res.render('manage/carpool-posts_create');
});

router.post('/manage/carpool-posts/create', function (req, res, next) {
  //아직 처리하지 않았습니다.
  res.redirect('/manage/carpool-posts');
});

router.get('/manage/proposal', function (req, res, next) {
  res.render('manage/proposal');
});

router.get('/manage/proposal/create', function (req, res, next) {
  res.render('manage/proposal_create');
});

router.post('/manage/proposal/create', function (req, res, next) {
  //아직 처리하지 않았습니다.
  res.redirect('/manage/proposal');
});

router.get('/manage/leave', function (req, res, next) {
  res.render('manage/leave');
});

/* GET chatting page. */
router.get('/chatting', function (req, res, next) {
  res.render('chatting/home');
});

/* GET & POST login page. */
router.get('/login', function (req, res, next) {
  res.render('login/home');
});

router.post('/login', function (req, res, next) {
  //아직 처리하지 않았습니다.
  res.redirect('/');
});

module.exports = router;
