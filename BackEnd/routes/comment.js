/* Module load */
let express = require('express');
let router = express.Router();
let comment = require('../lib/comment');

router.get('/:id', function (req, res) {
    comment.comment(req, res);
});

router.post('/create', function (req, res) {
    /* 프론트엔드에서 보내줘야 하는 값: description, type_board, board_id, is_re_comment, parent_comment */
    comment.create(req, res);
});

router.post('/update/:id', function (req, res) {
    /* 프론트엔드에서 보내줘야 하는 값: description */
    comment.update(req, res);
  });

router.post('/delete/:id', function (req, res) {
    comment.delete(req, res);
});

module.exports = router;
