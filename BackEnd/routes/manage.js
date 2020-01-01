/* Module load */
let express = require('express');
let router = express.Router();
let db = require('../config/db');
let auth = require('../lib/auth');
const { users } = require('../models');
const { market_board } = require('../models');
const { market_files } = require('../models');
const { networking_board } = require('../models');
const { networking_files } = require('../models');
const { proposal } = require('../models');
//const { cal_events } = require('../models');
let moment = require('moment');
moment.locale('ko');

/* AWS SDK, multer-s3 */
let multerS3 = require('../lib/multerS3')();
let upload = multerS3.upload;
let s3 = multerS3.s3;

/* manage page. */
router.get('/', function (req, res) {
  res.json({ user: req.user ? req.user : 0 });
});

/* market-posts */
router.get('/market', function (req, res) {
  (!auth.isOwner(req, res)) ?
    res.json({ user: req.user ? req.user : 0 }) :
    (auth.hasPost(req, 'market_board', 'author') === 0) ?
      res.json({ postlist: undefined, user: req.user ? req.user : 0 }) :
      market_board.findAll({ 
        where: { author: req.user.username },
        order: [[ 'id','DESC' ]]
      }).then(result => {
        res.json({ postlist: result, user: req.user ? req.user : 0 });
      }).catch(function (err) { throw err; });
});

/* networking-posts */
router.get('/networking', function (req, res) {
  (!auth.isOwner(req, res)) ?
    res.json({ user: req.user ? req.user : 0 }) :
    (auth.hasPost(req, 'networking_board', 'author') === 0) ?
      res.json({ postlist: undefined, user: req.user ? req.user : 0 }) :
      networking_board.findAll({ 
        where: { author: req.user.username },
        order: [[ 'id','DESC' ]]
      }).then(function (result) {
        res.json({ postlist: result, user: req.user ? req.user : 0 });
      }).catch(function (err) { throw err; });
});

/* carpool-posts */
router.get('/carpool', function (req, res) {
  (!auth.isOwner(req, res)) ?
    res.json({ user: req.user ? req.user : 0 }) :
    (auth.hasPost(req, 'cal_events', 'username') === 0) ?
      res.json({ postlist: undefined, user: req.user ? req.user : 0 }) :
      db.query(
        `SELECT * FROM cal_events WHERE username='${req.user.username}'`,
        function (error, results) {
          if (error) throw error;
          res.json({ postlist: results, user: req.user ? req.user : 0 });
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
    proposal.create({ title: title, description: description, author: req.user.username }).then(function () {
      res.redirect('/api/manage/proposal');
    }).catch(function (err) { throw err; });
});

/* account */
router.get('/account', function (req, res) {
  res.json({ user: req.user ? req.user : 0 });
});

router.get('/account/data', function (req, res) {
  res.json({ user: req.user ? req.user : 0 });
});

router.post('/account/data', function (req, res) {
  if (!auth.isOwner(req, res)) {
    res.json({ user: req.user ? req.user : 0 });
  }
  else {
    /* 1. Deletion of market posts */
    let firstfunc = function (foo2) {
      market_board.findAll({ where: { author: req.body.username } }).then(function (result) {
        for (let i = 0; i < result.length; i++) { //한 게시물에 해당하는 파일을 싹 지우기
          let id = result[i].id; //id는 게시물의 id
          market_files.findAll({ where: { board_id: id } }).then(function (files) {
            for (let j = 0; j < files.length; j++) {
              s3.deleteObject(
                {
                  Bucket: "uitda.net",
                  Key: files[j].filename
                },
                (err, data) => {
                  if (err) throw err;
                  console.log(data);
                }
              );
            }
          }).catch(function (err) { throw err });
          market_files.destroy({ where: { board_id: id } }).catch(function (err) { throw err });
          market_board.destroy({ where: { id: id } }).catch(function (err) { throw err });
        }
      }).catch(function (err) { throw err });
    };
    /* 2. Deletion of networking posts */
    let secondfunc = function (foo3) {
      networking_board.findAll({ where: { author: req.body.username } }).then(function (result) {
        for (let i = 0; i < result.length; i++) { //한 게시물에 해당하는 파일을 싹 지우기
          let id = result[i].id; //id는 게시물의 id
          networking_files.findAll({ where: { board_id: id } }).then(function (files) {
            for (let j = 0; j < files.length; j++) {
              s3.deleteObject(
                {
                  Bucket: "uitda.net",
                  Key: files[j].filename
                },
                (err, data) => {
                  if (err) throw err;
                  console.log(data);
                }
              );
            }
          }).catch(function (err) { throw err });
          networking_files.destroy({ where: { board_id: id } }).catch(function (err) { throw err });
          networking_board.destroy({ where: { id: id } }).catch(function (err) { throw err });
        }
      }).catch(function (err) { throw err });
    };
    /* 3. Logout */
    let thirdfunc = function (foo4) {
      req.logout();
      req.session.save(function () {
        foo4;
      });
    };
    /* 4. Deletion of user data */
    let forthfunc = function () {
      users.destroy({ where: { username: req.body.username } }).catch(function (err) { throw err });
    };
    /* 5. Main part */
    if (auth.sameOwner(req, req.body.username) === 0) {
      res.json({ user: req.user ? req.user : 0 });
    }
    else {
      firstfunc(secondfunc(thirdfunc(forthfunc())));
      res.redirect('/api/');
    }
  }

});

module.exports = router;
