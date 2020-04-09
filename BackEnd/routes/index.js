/* Module load */
var express = require('express');
var router = express.Router();

/* Home page. */
router.get('/', function (req, res, next) {
  console.log(req.user);
  res.json({ title: 'Uitda', user: req.user ? req.user : 0 });
});

/* Logout */
router.get('/logout/local', function (req, res) {
    req.session.destroy(function(err) {
      req.logout();
      res.redirect('/');
    });
});

router.get('/logout/outlook', function (req, res) {
  req.session.destroy(function(err) {
    req.logout();
    res.redirect('https://login.microsoftonline.com/common/oauth2/logout');
  });
});

module.exports = router;
