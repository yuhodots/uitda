var express = require('express');
var router = express.Router();
var sanitizeHtml = require('sanitize-html');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title : 'Uitda'});
});

/* GET market page. */
router.get('/market', function(req, res, next) {
  res.render('market/home');
});

/* GET networking page. */
router.get('/networking', function(req, res, next) {
  res.render('networking/home');
});

/* GET carpool page. */
router.get('/carpool', function(req, res, next) {
  res.render('carpool/home');
});

/* GET manage page. */
router.get('/manage', function(req, res, next) {
  res.render('manage/home');
});

router.get('/manage/market-posts', function(req, res, next) {
  res.render('manage/market-posts');
});

router.get('/manage/networking-posts', function(req, res, next) {
  res.render('manage/networking-posts');
});

router.get('/manage/carpool-posts', function(req, res, next) {
  res.render('manage/carpool-posts');
});

router.get('/manage/proposal', function(req, res, next) {
  res.render('manage/proposal');
});

router.get('/manage/leave', function(req, res, next) {
  res.render('manage/leave');
});

/* GET chatting page. */
router.get('/chatting', function(req, res, next) {
  res.render('chatting/home');
});

module.exports = router;
