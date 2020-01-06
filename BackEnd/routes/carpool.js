/* Module load */
let express = require('express');
let router = express.Router();
let db = require('../config/db');
let auth = require('../lib/auth');
const { cal_events } = require('../models');

/* Category: carpool page. */
router.get('/', function (req, res) {
  cal_events.findAll().then(function (results) {
    res.json({ events: results, user: req.user ? req.user : 0 });
  }).catch(function (err) { throw err; });
});

router.get('/create', function (req, res) {
  res.json({ user: req.user ? req.user : 0 });
});

router.post('/create', function (req, res) {
  let title = req.body.title;
  let description = req.body.description;
  let start = '2020-01-05T12:30:00';
  let end = '2020-01-05T14:30:00';
  (!auth.isOwner(req, res)) ?
    res.json({ user: req.user ? req.user : 0 }) :
    cal_events.create({title:title, description:description, username:req.user.username, start:start, end:end}).then(function(){
      res.redirect('/api/manage/carpool');
    }).catch(function(err){throw err;});
});

router.get('/update/:id', function (req, res) {
  (!auth.isOwner(req, res)) ?
    res.json({ user: req.user ? req.user : 0 }) :
    cal_events.findOne({ where : { id : req.params.id } }).then(function(content){
      (auth.sameOwner(req,content.username) === 0)?
        res.json({ user: req.user ? req.user : 0 }):
        res.json({ post: content, user: req.user ? req.user : 0 });
    }).catch(function(err){
      throw err;
    });
});

router.post(`/update/:id`, function (req, res) {
  let title = req.body.title;
  let description = req.body.description;
  let start = '2019-09-06T12:00:27.000Z';
  let id = req.params.id;
  (!auth.isOwner(req, res)) ?
    res.json({ user: req.user ? req.user : 0 }) :
    cal_events.findOne({ where:{ id:id } }).then(function(content){
      (auth.sameOwner(req, content.username) === 0)?
        res.json('cheat', { user: req.user ? req.user : 0 }):
        cal_events.update({ title :title, start:start, description:description },{ where:{ id : id } }).then(function(){
          res.redirect('/api/manage/carpool');
        }).catch(function(err){
          throw err;
        });
  }).catch(function(err){ throw err;});
});

router.post('/delete/:id', function (req, res, next) {
  (!auth.isOwner(req, res)) ?
    res.json({ user: req.user ? req.user : 0 }) :
    db.query(
      `SELECT * FROM cal_events WHERE id=?`, [req.params.id],
      function (error, result) {
        if (error) throw error;
        (auth.sameOwner(req, result[0].username) === 0) ?
          res.json({ user: req.user ? req.user : 0 }) :
          db.query(
            'DELETE FROM cal_events WHERE id = ?', [req.params.id],
            function (error, result) {
              if (error) throw error;
              res.redirect('/api/manage/carpool');
            }
          );
      }
    );
});

module.exports = router;