/* Module load */
let express = require('express');
let router = express.Router();
let board = require('../lib/board');

/* Category: networking page. */
router.get('/', function (req, res) {
  board.postlist('networking', req, res);
});

router.get('/:id', function (req, res) {
  board.post('networking', req, res);
});

router.post('/delete', function (req, res, next) {
  board.delete('networking', req, res);
});

module.exports = router;
