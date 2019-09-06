/* Module load */
var express = require('express');
var router = express.Router();
var db = require('../config/db');
var auth = require('../lib/auth');
const { users } = require('../models');
const { market_board } = require('../models');
const { market_files } = require('../models');
const { networking_board } = require('../models');
const { networking_files } = require('../models');
const { proposal } = require('../models');
//const { cal_events } = require('../models');
const hey = require('../models/index');
var moment = require('moment');
var time = moment().format();


/* AWS SDK, multer-s3 */
var multerS3 = require('../lib/multerS3')();
var upload = multerS3.upload;
var s3 = multerS3.s3;

/* Category: manage page. */
router.get('/', function (req, res, next) {
    if (!auth.isOwner(req, res)) {
        res.render('manage/anonymous', { user: req.user ? req.user : 0 });
    }
    else {
        res.render('manage/home', { user: req.user ? req.user : 0 });
    }
});

/* market-posts */
router.get('/market-posts', function (req, res, next) {
    if (!auth.isOwner(req, res)) {
        res.render('manage/anonymous', { user: req.user ? req.user : 0 });
    }
    else {
        if (auth.hasPost(req, 'market_board','author') === 0) { // 작성한 게시글이 데이터가 없는 경우
            res.render('manage/market-posts', { postlist: undefined, user: req.user ? req.user : 0 });
        }
        else {
          market_board.findAll({where:{author :req.user.username}}).then(result => {
            res.render('manage/market-posts', { postlist: result, user: req.user ? req.user : 0 });
              }).catch(function(err){
               //TODO: error handling
               throw err;
          });
        }
    }
});

router.get('/market-posts/create', function (req, res, next) {
    if (!auth.isOwner(req, res)) {
        res.render('manage/anonymous', { user: req.user ? req.user : 0 });
    }
    else {
        res.render('manage/market-posts_create', { user: req.user ? req.user : 0 });
    }
});

router.post('/market-posts/create', upload.array('userfile', 6), function (req, res, next) {
    if (!auth.isOwner(req, res)) {
        res.render('manage/anonymous', { user: req.user ? req.user : 0 });
    }
    else {
        var title = req.body.title;
        var description = req.body.description;
        var files = req.files;
        market_board.create({
          title: title, description:description, author:req.user.username, created:moment().format(),filenum:files.length, count: 0
        }).then(function(){
          if(files.length){
            var board_id = 0;
            market_board.max('id').then(function(max){
              board_id = max;
            }).then(function(){
              for (var i = 0; i < files.length; i++) {
                market_files.create({
                  board_id: board_id, file_id:i, filename:files[i].key, location:files[i].location
                }).catch(function(err){
                     throw err;
                });
              }
            }).catch(function(error){
              throw error;
            });
          }
        }).catch(function(err){
             throw err;
        });
        res.redirect('/api/manage/market-posts');
    }
});

router.get('/market-posts/update/:id', function (req, res, next) {
    if (!auth.isOwner(req, res)) {
        res.render('manage/anonymous', { user: req.user ? req.user : 0 });
    }
    else {
        market_board.findOne({where : {id : req.params.id}}).then(function(content){
          if(auth.sameOwner(req,content.author) === 0){
            res.render('cheat', { user: req.user ? req.user : 0 });
          } else{
            res.render('manage/market-posts_update', { post: content, user: req.user ? req.user : 0 });
          }
        }).catch(function(err){
          throw err;
        });
    }
});

router.post(`/market-posts/update/:id`, function (req, res, next) {
    if (!auth.isOwner(req, res)) {
        res.render('manage/anonymous', { user: req.user ? req.user : 0 });
    }
    else {
        // 아직 파일 수정 구현은 하지 않았습니다.
        var title = req.body.title;
        var description = req.body.description;
        var id = req.body.id;
        market_board.findOne({where:{id:id}}).then(function(content){
          if (auth.sameOwner(req, content.author) === 0) { // 다른 사용자의 잘못된 접근
              res.render('cheat', { user: req.user ? req.user : 0 });
          } else { // 올바른 사용자의 접근
            market_board.update({
              title :title, description:description, created:moment().format()
            },{where:{id : id}}).then(function(){
              res.redirect(`/api/market/${id}`);
            })
            .catch(function(err){
              throw err;
            });
          }
      }).catch(function(err){ throw err;});
    }
});

/* networking-posts */
router.get('/networking-posts', function (req, res, next) {
    if (!auth.isOwner(req, res)) {
        res.render('manage/anonymous', { user: req.user ? req.user : 0 });
    }
    else {
        if (auth.hasPost(req, 'networking_board','author') === 0) { // 작성한 게시글이 데이터가 없는 경우
            res.render('manage/networking-posts', { postlist: undefined, user: req.user ? req.user : 0 });
        }
        else {
          ////
          networking_board.findAll({where :{author : req.user.username }}).then(function(result){
            res.render('manage/networking-posts', { postlist: result, user: req.user ? req.user : 0 });
          }).catch(function(err){
            throw err;
          });
        }
    }
});

router.get('/networking-posts/create', function (req, res, next) {
    if (!auth.isOwner(req, res)) {
        res.render('manage/anonymous', { user: req.user ? req.user : 0 });
    }
    else {
        res.render('manage/networking-posts_create', { user: req.user ? req.user : 0 });
    }
});

router.post('/networking-posts/create', upload.array('userfile', 6), function (req, res, next) {
    if (!auth.isOwner(req, res)) {
        res.render('manage/anonymous', { user: req.user ? req.user : 0 });
    }
    else {
        var title = req.body.title;
        var description = req.body.description;
        var files = req.files;
        networking_board.create({
          title: title, description:description, author:req.user.username, created:moment().format(),filenum:files.length, count: 0
        }).then(function(){
          if(files.length){
            var board_id = 0;
            networking_board.max('id').then(function(max){
              board_id = max;
            }).then(function(){
              for (var i = 0; i < files.length; i++) {
                networking_files.create({
                  board_id: board_id, file_id:i, filename:files[i].key, location:files[i].location
                }).catch(function(err){
                     throw err;
                });
              }
            }).catch(function(error){
              throw error;
            });
          }
        }).catch(function(err){
             throw err;
        });
        res.redirect('/api/manage/networking-posts');
    }
});

router.get('/networking-posts/update/:id', function (req, res, next) {
    if (!auth.isOwner(req, res)) {
        res.render('manage/anonymous', { user: req.user ? req.user : 0 });
    }
    else {
      networking_board.findOne({where : {id : req.params.id}}).then(function(content){
        if(auth.sameOwner(req,content.author) === 0){
          res.render('cheat', { user: req.user ? req.user : 0 });
        } else{
          res.render('manage/networking-posts_update', { post: content, user: req.user ? req.user : 0 });
        }
      }).catch(function(err){
        throw err;
      });
    }
});

router.post(`/networking-posts/update/:id`, function (req, res, next) {
    if (!auth.isOwner(req, res)) {
        res.render('manage/anonymous', { user: req.user ? req.user : 0 });
    }
    else {
        // 아직 파일 수정 구현은 하지 않았습니다.
        var title = req.body.title;
        var description = req.body.description;
        var id = req.body.id;
        networking_board.findOne({where:{id:id}}).then(function(content){
          if (auth.sameOwner(req, content.author) === 0) { // 다른 사용자의 잘못된 접근
              res.render('cheat', { user: req.user ? req.user : 0 });
          } else { // 올바른 사용자의 접근
          networking_board.update({
            title :title, description:description,created:moment().format()
          },{where:{id : id}}).then(function(){
            res.redirect(`/api/networking/${id}`);
          }).catch(function(err){
            throw err;
          });
        }
      }).catch(function(err){ throw err;});
    }
});
/* carpool-posts */
router.get('/carpool-posts', function (req, res, next) {
    if (!auth.isOwner(req, res)) {
        res.render('manage/anonymous', { user: req.user ? req.user : 0 });
    }
    else {
        if (auth.hasPost(req, 'cal_events','username') === 0) { // 작성한 게시글이 데이터가 없는 경우
            res.render('manage/carpool-posts', { postlist: undefined, user: req.user ? req.user : 0 });
        }
        else {
            db.query(
                `SELECT * FROM cal_events WHERE username='${req.user.username}'`,
                function (error, results) {
                    if (error) throw error;
                    res.render('manage/carpool-posts', { postlist: results, user: req.user ? req.user : 0 });
                }
            )
        }
    }
});

router.get('/carpool-posts/create', function (req, res, next) {
    if (!auth.isOwner(req, res)) {
        res.render('manage/anonymous', { user: req.user ? req.user : 0 });
    }
    else {
        res.render('manage/carpool-posts_create', { user: req.user ? req.user : 0 });
    }
});

router.post('/carpool-posts/create', function (req, res, next) {
    if (!auth.isOwner(req, res)) {
        res.render('manage/anonymous', { user: req.user ? req.user : 0 });
    }
    else {
        if (!auth.isOwner(req, res)) {
            res.render('manage/anonymous', { user: req.user ? req.user : 0 });
        }
        else {
            var title = req.body.origin + '->' + req.body.destination;
            var month =req.body.month;
            var day = req.body.day;
            var hour = req.body.hours

            var start = '2019-' + req.body.month + '-' + req.body.day + 'T' + req.body.hour + ':' + req.body.min + ':00';

            //두자리수만 가능...
        //    2019-09-06T12:00:27.000Z
            var description = req.body.description;
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

        }
    }
});

router.get('/carpool-posts/update/:id', function (req, res, next) {
    if (!auth.isOwner(req, res)) {
        res.render('manage/anonymous', { user: req.user ? req.user : 0 });
    }
    else {
      /////////////////////////
      /*
      cal_events.findOne({where : {id : req.params.id}}).then(function(content){
        if(auth.sameOwner_carpool(req,content.username) === 0){
          res.render('cheat', { user: req.user ? req.user : 0 });
        } else{
          res.render('manage/carpool-posts_update', { post: content, user: req.user ? req.user : 0 });
        }
      }).catch(function(err){
        throw err;
      });
      */
      ///////////////////////
        db.query(
            `SELECT * FROM cal_events`,
            function (error, results) {
                if (error) throw error;
                db.query(
                    `SELECT * FROM cal_events WHERE id=?`,
                    [req.params.id],
                    function (error2, result) {
                        if (error2) throw error2;
                        else {
                            if (auth.sameOwner_carpool(req, result[0].username) === 0) { // 다른 사용자의 잘못된 접근
                                res.render('cheat', { user: req.user ? req.user : 0 });
                            }
                            else { // 올바른 사용자의 접근
                                res.render('manage/carpool-posts_update', { post: result[0], user: req.user ? req.user : 0 });
                            }
                        }
                    }
                )
            }
        )
    }
});

router.post(`/carpool-posts/update/:id`, function (req, res, next) {
    if (!auth.isOwner(req, res)) {
        res.render('manage/anonymous', { user: req.user ? req.user : 0 });
    }
    else {
        var title = req.body.origin + '->' + req.body.destination;
        var start = '2019-'+ req.body.month + '-' + req.body.day + 'T' + req.body.hour + ':' + req.body.min + ':00';
        var description = req.body.description;
        var id = req.body.id;
        /////////////////////////
        /*
        cal_events.findOne({where:{id:id}}).then(function(content){
          if (auth.sameOwner_carpool(req, content.username) === 0) { // 다른 사용자의 잘못된 접근
              res.render('cheat', { user: req.user ? req.user : 0 });
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
        /////////////////////////
        db.query(
            `SELECT * FROM cal_events WHERE id=?`,
            [id],
            function (error, result) {
                if (error) throw error;
                else {
                    if (auth.sameOwner_carpool(req, result[0].username) === 0) { // 다른 사용자의 잘못된 접근
                        res.render('cheat', { user: req.user ? req.user : 0 });
                    }
                    else { // 올바른 사용자의 접근
                        db.query(
                            'UPDATE cal_events SET title=?, start=?, description=? WHERE id=?',
                            [title, start, description, id],
                            function (error2, result) {
                                if (error2) throw error2;
                                res.redirect(`/api/carpool`);
                            }
                        )
                    }
                }
            }
        )
    }
});
///////////////////////////////////////
/* proposal */
router.get('/proposal', function (req, res, next) {
    if (!auth.isOwner(req, res)) {
        res.render('manage/anonymous', { user: req.user ? req.user : 0 });
    }
    else {
        res.render('manage/proposal', { user: req.user ? req.user : 0 });
    }
});

router.get('/proposal/create', function (req, res, next) {
    if (!auth.isOwner(req, res)) {
        res.render('manage/anonymous', { user: req.user ? req.user : 0 });
    }
    else {
        res.render('manage/proposal_create', { user: req.user ? req.user : 0 });
    }
});

router.post('/proposal/create', function (req, res, next) {
    if (!auth.isOwner(req, res)) {
        res.render('manage/anonymous', { user: req.user ? req.user : 0 });
    }
    else {
        var title = req.body.title;
        var description = req.body.description;
        proposal.create({title:title,description:description, author:req.user.username}).then(function(){
          res.redirect('/api/manage/proposal');
        }).catch(function(err){throw err;});
    }
});

/* account */
router.get('/account', function (req, res, next) {
    if (!auth.isOwner(req, res)) {
        res.render('manage/anonymous', { user: req.user ? req.user : 0 });
    }
    else {
        res.render('manage/account', { user: req.user ? req.user : 0 });
    }
});

router.get('/account/data', function (req, res, next) {
    if (!auth.isOwner(req, res)) {
        res.render('manage/anonymous', { user: req.user ? req.user : 0 });
    }
    else {
        res.render('manage/account_data', { user: req.user ? req.user : 0 });
    }
});

router.post('/account/data', function (req, res, next) {
    if (!auth.isOwner(req, res)) {
        res.render('manage/anonymous', { user: req.user ? req.user : 0 });
    }
    else {
        /* 1. Deletion of market posts */
        var firstfunc = function (foo2) {
          market_board.findAll({where:{author:req.body.username}}).then(function(result){
            for (var i = 0; i < result.length; i++) { //한 게시물에 해당하는 파일을 싹 지우기
                var id = result[i].id; //id는 게시물의 id
                market_files.findAll({where:{board_id:id}}).then(function(files){
                  for (var j = 0; j < files.length; j++) {
                      s3.deleteObject(
                          {
                              Bucket: "uitda.net",
                              Key: files[j].filename
                          },
                          (err, data) => {
                              if (err) throw err;
                              console.log(data);
                          }
                      );
                  }
                }).catch(function(err){throw err});
                market_files.destroy({where:{board_id:id}}).catch(function(err){throw err});
                market_board.destroy({where:{id:id}}).catch(function(err){throw err});
            }
          }).catch(function(err){throw err});
        };
        /* 2. Deletion of networking posts */
        var secondfunc = function (foo3) {
          networking_board.findAll({where:{author:req.body.username}}).then(function(result){
            for (var i = 0; i < result.length; i++) { //한 게시물에 해당하는 파일을 싹 지우기
                var id = result[i].id; //id는 게시물의 id
                networking_files.findAll({where:{board_id:id}}).then(function(files){
                  for (var j = 0; j < files.length; j++) {
                      s3.deleteObject(
                          {
                              Bucket: "uitda.net",
                              Key: files[j].filename
                          },
                          (err, data) => {
                              if (err) throw err;
                              console.log(data);
                          }
                      );
                  }
                }).catch(function(err){throw err});
                networking_files.destroy({where:{board_id:id}}).catch(function(err){throw err});
                networking_board.destroy({where:{id:id}}).catch(function(err){throw err});
            }
          }).catch(function(err){throw err});
        };
        /* 3. Logout */
        var thirdfunc = function (foo4) {
            req.logout();
            req.session.save(function () {
                foo4;
            });
        };
        /* 4. Deletion of user data */
        var forthfunc = function () {
            users.destroy({where:{username : req.body.username}}).catch(function(err){throw err});
        };
        /* 5. Main part */
        if (auth.sameOwner(req, req.body.username) === 0) {
            res.render('cheat', { user: req.user ? req.user : 0 });
        }
        else {
            firstfunc(secondfunc(thirdfunc(forthfunc())));
            res.redirect('/api/');
        }
    }

});

module.exports = router;
