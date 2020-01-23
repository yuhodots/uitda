/* Module load */
let express = require('express');
let router = express.Router();
let board = require('../lib/board');
let auth = require('../lib/auth');
const { networking_board } = require('../models');

/* AWS SDK, multer-s3 */
let multerS3 = require('../lib/multerS3')();
let upload = multerS3.upload;

/* User checking */
let usercheck = function (req, res, next) {
  (req.user)? next(): res.end();
};

/* Category: networking page. */
router.get('/', function (req, res) {
  board.postlist('networking', req, res);
});

router.get('/:id', function (req, res) {
  board.post('networking', req, res);
});

router.get('/create', function (req, res) {
  res.json({ user: req.user ? req.user : 0 });
});

router.post('/create', [ usercheck, upload.array('userfile', 6) ], function (req, res) {
  board.create('networking', req, res);
});

router.get('/update/:id', function (req, res) {
  (!auth.isOwner(req, res)) ?
    res.json({ user: req.user ? req.user : 0 }) :
    networking_board.findOne({ where: { id: req.params.id } }).then(function (content) {
      (auth.sameOwner(req, content.author) === 0) ?
        res.json({ user: req.user ? req.user : 0 }) :
        board.post('networking', req, res);
    }).catch(function (err) { throw err; });
});

router.post(`/update/:id`, [ usercheck, upload.array('added', 6) ], function (req, res) {
  board.update('networking', req, res);
});

router.post('/delete/:id', function (req, res) {
  board.delete('networking', req, res);
});

module.exports = router;
