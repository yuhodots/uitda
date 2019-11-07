/* Module load */
let express = require('express');
let router = express.Router();
let board = require('../lib/boardv');

/* Category: market page. */
router.get('/', function (req, res) {
  board.postlist('market', req, res);
});

router.get('/:id', function (req, res) {
  board.post('market', req, res);
});

router.post('/delete', function (req, res) {
  board.delete('market', req, res);
});

module.exports = router;