/* Module load */
var express = require('express');
var router = express.Router();
var auth = require('../lib/auth');

/* Category: chatting page. */
router.get('/', function (req, res, next) {
    if (!auth.isOwner(req, res)) {
        res.json('chatting/anonymous', { user: req.user ? req.user : 0 });
    }
    else {
        res.json('chatting/home', { user: req.user ? req.user : 0 });
    }
});

module.exports = router;

