/* Module load */
let express = require('express');
let router = express.Router();
let board = require('../lib/board');
let auth = require('../lib/auth');
const { market_board } = require('../models');

/* AWS SDK, multer-s3 */
let multerS3 = require('../lib/multerS3')();
let upload = multerS3.upload;

/* User checking */
/* 로그인 하지 않은 유저의 요청을 home으로 리다이렉트 */
let usercheck = function (req, res, next) {
  (req.user)? next(): res.redirect('/');
};

/* Category: market page. */
router.get('/', function (req, res) {
  board.postlist('market', req, res);
});

router.get('/:id', function (req, res) {
  board.post('market', req, res);
});

router.get('/create', function (req, res) {
  res.json({ user: req.user ? req.user : 0 });
});

router.post('/create', [ usercheck, upload.array('userfile', 6) ], function (req, res) {
  board.create('market', req, res);
});

router.get('/update/:id', function (req, res) {
  (!auth.isOwner(req, res)) ?
    res.json({ user: req.user ? req.user : 0 }) :
    market_board.findOne({ where: { id: req.params.id } }).then(function (content) {
      (auth.sameOwner(req, content.email) === 0) ?
        res.json({ user: req.user ? req.user : 0 }) :
        board.post('market', req, res);
    }).catch(function (err) { throw err; });
});

router.post(`/update/condition/:id`,  function (req, res) {
  /* x-www-form-urlencoded: condition ('판매 중', '거래 중','판매 완료') */
  board.update_condition('market', req, res);
});

router.post(`/update/:id`, [ usercheck, upload.array('added', 6) ], function (req, res) {
  board.update('market', req, res);
});

router.post('/delete/:id', function (req, res) {
  board.delete('market', req, res);
});

module.exports = router;
