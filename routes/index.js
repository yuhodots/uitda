var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title : 'Uitda'});
});

router.get('/market', function(req, res, next) {
  res.render('market');
});

router.get('/networking', function(req, res, next) {
  res.render('networking');
});

router.get('/carpool', function(req, res, next) {
  res.render('carpool');
});

router.get('/manage', function(req, res, next) {
  res.render('manage');
});

router.get('/manage/market-posts', function(req, res, next) {
  res.render('manage_market-posts');
});

router.get('/manage/networking-posts', function(req, res, next) {
  res.render('manage_networking-posts');
});

router.get('/manage/carpool-posts', function(req, res, next) {
  res.render('manage_carpool-posts');
});

router.get('/manage/proposal', function(req, res, next) {
  res.render('manage_proposal');
});

router.get('/manage/leave', function(req, res, next) {
  res.render('manage_leave');
});

router.get('/chatting', function(req, res, next) {
  res.render('chatting');
});

module.exports = router;
