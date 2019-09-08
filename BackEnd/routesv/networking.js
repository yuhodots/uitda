/* Module load */
var express = require('express');
var router = express.Router();
var auth = require('../lib/auth');
const { networking_board } = require('../models');
const { networking_files } = require('../models');
const { users} =require('../models');
var moment = require('moment');
moment.locale('ko');

/* AWS SDK, multer-s3 */
var multerS3 = require('../lib/multerS3')();
var s3 = multerS3.s3;
function make_writer(username,profile_picture,pic_location){
  var writer ={
    username: username,
    profile_picture:profile_picture,
    pic_location:pic_location
  }
  return writer;
}
function make_file(files, num){
  var file = [];
  for ( i = 0;i<num;i++){
    file.push(files[i].dataValues);
  }
  return file;
}
function make_ob(id,title,user,created,condition,description,filelist){
  var post ={
    id:id,
    title:title,
    user:user,
    created:created,
    condition:condition,
    description:description,
    filelist:filelist
  }
  return post;
}

/* Category: networking page. */
router.get('/', function (req, res, next) {
  networking_board.findAll().then(function(projects){
    if(projects.length){
      var contents = make_file(projects,projects.length);
      var postlist = [];
      for(var i=0;i<projects.length;i++){
        (function(i){
          var content = contents[i];
          networking_files.findAll({where : {board_id : content.id}}).then(function(files){
            users.findOne({where:{username : content.author}}).then(function(user){
              var writer = make_writer(user.username,user.profile_picture,user.pic_location);
              var filelist = [];
              if(files.length>0){
                  filelist = make_file(files,files.length);
              }
              var time = moment(content.created,'YYYY년MM월DD일HH시mm분ss초').fromNow();
              var post = make_ob(content.id,content.title,writer,time,content.condition,content.description,filelist);
              postlist.push(post);
              if((i+1)===projects.length){
                console.log(postlist);
                res.render('networking/home', { postlist: postlist, user: req.user ? req.user : 0 });
              }
            }).catch(function(err){throw err;})
          }).catch(function(err){
            throw err;
          });
        })(i);
      }
    } else{
      res.render('networking/home', {postlist: undefined,  user: req.user ? req.user : 0 });
    }
  }).catch(function(err){throw err;});
});

router.get('/:id', function (req, res, next) {
  networking_board.findOne({where : {id : req.params.id}}).then(function(content){
    networking_files.findAll({where : {board_id : req.params.id}}).then(function(files){
      users.findOne({where:{username : content.author}}).then(function(user){
        var writer = make_writer(user.username,user.profile_picture,user.pic_location);
        var filelist = make_file(files,files.length);
        var time = moment(content.created,'YYYY년MM월DD일HH시mm분ss초').fromNow();
        var post = make_ob(content.id,content.title,writer,time,content.condition,content.description,filelist);
        console.log(post);
        res.render('networking/post', { post: post, user: req.user ? req.user : 0 });
      }).catch(function(err){throw err;})
    }).catch(function(err){
      throw err;
    });
  }).catch(function(err){
    throw err;
  });
});

router.post('/delete', function (req, res, next) {
  if (!auth.isOwner(req, res)) {
      res.render('networking/anonymous', { user: req.user ? req.user : 0 });
  }
  else {
    networking_board.destroy({where : {id:req.body.id}}).catch(function(err){throw err;});
    networking_files.findAll({where :{board_id:req.body.id}}).then(function(content){
      if(content.length){
        for (var i = 0; i < content.length; i++) {
            s3.deleteObject(
                {
                    Bucket: "uitda.net",
                    Key: content[i].filename
                },
                (err, data) => {
                    if (err) throw err;
                    console.log(data);
                }
            );
        }
        networking_files.destroy({where:{board_id:req.body.id}}).catch(function(err){throw err;})
      }
    }).catch(function(err){throw err;})
    res.redirect('/view/manage/networking-posts');
  }
});

module.exports = router;
