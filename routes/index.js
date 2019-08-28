/* Module load */
var express = require('express');
var router = express.Router();

/* Home page. */
router.get('/', function (req, res, next) {
  console.log(req.user);
  res.render('index', { title: 'Uitda', user: req.user ? req.user : 0 });
});

/* Logout */
router.get('/logout', function (req, res) {
  req.logout();
  req.session.save(function () {
    res.redirect('/api/');
  });
});

module.exports = router;
