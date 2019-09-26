/* Module load */
var express = require('express');
var router = express.Router();
var auth = require('../lib/auth');
const { networking_board } = require('../models');
const { networking_files } = require('../models');
const { users} =require('../models');
var moment = require('moment');
require('moment-timezone'); 
moment.tz.setDefault("Asia/Seoul"); 
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
  var num_of_data = 6;
  var scroll = Number(req.query.scroll); // 프론트 엔드에서 넘겨줘야 하는 값
  networking_board.count().then(function(count){
    if(count < num_of_data * scroll){
      res.json({postlist: undefined,  user: req.user ? req.user : 0 });
    }
    var scrollEnd = (count < num_of_data * scroll + num_of_data)? 1 : 0;
    networking_board.findAndCountAll({
      offset: (scrollEnd)? 0 : count - num_of_data * (scroll + 1),
      limit: (scrollEnd)? count%num_of_data : num_of_data 
    }).then(function(projects){
      projects = projects["rows"]; // fincAndCountAll 메소드는 객체 정보를 count, row 키로 보내기 떄문에 이와같이 수정해 줘야함
      if(projects.length){
        var contents = make_file(projects,projects.length);
        var postlist = [];
        for(var i=0;i<projects.length;i++){
          (function(i){
            var content = contents[i];
            networking_files.findAll({where : {board_id : content.id}}).then(function(files){
              users.findOne({where:{username : content.author}}).then(function(user){
                var filelist = [];
                if(files.length>0){
                    filelist = make_file(files,files.length);
                }
                var writer = make_writer(user.username,user.profile_picture,user.pic_location);
                var time = moment(content.created,'YYYY년MM월DD일HH시mm분ss초').fromNow();
                var post = make_ob(content.id, content.title, writer, time, content.price, content.condition, content.description, filelist);
                postlist[i] = post;
                if((i+1)===projects.length){
                  res.json({ postlist: postlist, user: req.user ? req.user : 0 });
                }
              }).catch(function(err){throw err;})
            }).catch(function(err){
              throw err;
            });
          })(i);
        }
      } else{
        res.json({postlist: undefined,  user: req.user ? req.user : 0 });
      }
    }).catch(function(err){throw err;});
  });
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
        res.json({ post: post, user: req.user ? req.user : 0 });
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
      res.json({ user: req.user ? req.user : 0 });
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
    res.redirect('/api/manage/networking-posts');
  }
});

module.exports = router;
