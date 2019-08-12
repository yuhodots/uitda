/* Module load */
var express = require('express');
var router = express.Router();

/* Category: carpool page. */
router.get('/', function (req, res, next) {
    res.render('carpool/home', { user: req.user ? req.user : 0 });
  });

module.exports = router;