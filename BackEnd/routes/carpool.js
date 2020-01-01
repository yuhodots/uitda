/* Module load */
let express = require('express');
let router = express.Router();
let db = require('../config/db');
let auth = require('../lib/auth');
//const { cal_events } = require('../models');

/* Category: carpool page. */
router.get('/', function (req, res) {
  res.json({ user: req.user ? req.user : 0 });
});

router.get('/create', function (req, res) {
  res.json({ user: req.user ? req.user : 0 });
});

router.post('/create', function (req, res) {
  let title = req.body.origin + '->' + req.body.destination;
  let description = req.body.description;
  let start = '2019-' + req.body.month + '-' + req.body.day + 'T' + req.body.hour + ':' + req.body.min + ':00';
  (!auth.isOwner(req, res)) ?
    res.json({ user: req.user ? req.user : 0 }) :

    //두자리수만 가능: 2019-09-06T12:00:27.000Z
    /*
      cal_events.create({title:title,description:description,username:req.user.username,start:start}).then(function(){
      res.redirect('/api/manage/carpool-posts');
      }).catch(function(err){throw err;})
    */
    db.query(
      `INSERT INTO cal_events (title, description, username, start) VALUES(?, ?, '${req.user.username}', ?)`,
      [title, description, start],
      function (error, result) {
        if (error) throw error;
        res.redirect('/api/manage/carpool-posts');
      }
    )
});

router.get('/update/:id', function (req, res) {
  (!auth.isOwner(req, res)) ?
    res.json({ user: req.user ? req.user : 0 }) :
    /*
    cal_events.findOne({where : {id : req.params.id}}).then(function(content){
      if(auth.sameOwner_carpool(req,content.username) === 0){
        res.json('cheat', { user: req.user ? req.user : 0 });
      } else{
        res.json('manage/carpool-posts_update', { post: content, user: req.user ? req.user : 0 });
      }
    }).catch(function(err){
      throw err;
    });
    */
    db.query(
      `SELECT * FROM cal_events`,
      function (error, results) {
        if (error) throw error;
        db.query(
          `SELECT * FROM cal_events WHERE id=?`,
          [req.params.id],
          function (error2, result) {
            if (error2) throw error2;
            (auth.sameOwner_carpool(req, result[0].username) === 0) ?
              res.json({ user: req.user ? req.user : 0 }) :
              res.json({ post: result[0], user: req.user ? req.user : 0 });
          }
        )
      }
    )
});

router.post(`/update/:id`, function (req, res) {
  let title = req.body.origin + '->' + req.body.destination;
  let description = req.body.description;
  let start = '2019-' + req.body.month + '-' + req.body.day + 'T' + req.body.hour + ':' + req.body.min + ':00';
  let id = req.body.id;
  (!auth.isOwner(req, res)) ?
    res.json({ user: req.user ? req.user : 0 }) :
    /*
    cal_events.findOne({where:{id:id}}).then(function(content){
      if (auth.sameOwner_carpool(req, content.username) === 0) { // 다른 사용자의 잘못된 접근
          res.json('cheat', { user: req.user ? req.user : 0 });
      } else { // 올바른 사용자의 접근
        cal_events.update({
          title :title, start:start,description:description
        },{where:{id : id}}).then(function(){
          res.redirect(`/api/carpool/${id}`);
        })
        .catch(function(err){
          throw err;
        });
      }
  }).catch(function(err){ throw err;});
  */
    db.query(
      `SELECT * FROM cal_events WHERE id=?`,
      [id],
      function (error, result) {
        if (error) throw error;
        (auth.sameOwner_carpool(req, result[0].username) === 0) ?
          res.json({ user: req.user ? req.user : 0 }) :
          db.query(
            'UPDATE cal_events SET title=?, start=?, description=? WHERE id=?',
            [title, start, description, id],
            function (error2, result) {
              if (error2) throw error2;
              res.redirect(`/api/carpool`);
            }
          );
      }
    );
});


router.post('/delete', function (req, res, next) {
  (!auth.isOwner(req, res)) ?
    res.json({ user: req.user ? req.user : 0 }) :
    db.query(
      `SELECT * FROM cal_events WHERE id=?`,
      [req.body.id],
      function (error, result) {
        if (error) throw error;
        (auth.sameOwner(req, result[0].username) === 0) ?
          res.json({ user: req.user ? req.user : 0 }) :
          db.query(
            'DELETE FROM cal_events WHERE id = ?',
            [req.body.id],
            function (error, result) {
              if (error) throw error;
              res.redirect('/api/manage/carpool-posts');
            }
          );
      }
    );
});

module.exports = router;