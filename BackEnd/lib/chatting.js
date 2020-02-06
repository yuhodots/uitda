/* Module load */
let auth = require('./auth');
let async = require('async');
const { chatting_room } = require('../models');
const { chatting_message } = require('../models');
const { users } = require('../models');
const sequelize = require("sequelize");
const Op = sequelize.Op;
let moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");
moment.locale('ko');

/* AWS SDK, multer-s3 */
//let multerS3 = require('../lib/multerS3')();
//let s3 = multerS3.s3;

/* Model method */
function make_writer(username, pic_location) {
    let writer = {
        username: username,
        pic_location: pic_location
    }
    return writer;
}
function make_writers(user1,user2) {
    let writers = [];
    writers.push(user1);
    writers.push(user2);
    return writers;
}
/* Board method */
module.exports = {
  main : function(req,res){
    chatting_room.findAll({
      where:{
         [Op.or]:[
           {author_1:req.user.username},
           {author_2:req.user.username}
         ]
      }
    }).then(function(roomlist){
      res.json({roomlist:roomlist, user: req.user ? req.user : 0})
      //console.log(roomlist);
    }).catch(function(err){throw err;});
  },
  room_create : function (req, res) {
    let title = req.body.title;
    let author_2 = req.body.author_2;
    chatting_room.create({
      title:title, author_1:req.user.username, author_2:author_2, created:moment().format('YYYY년MM월DD일HH시mm분ss초')
    }).catch(function(err){
      throw err;
    });
    res.redirect(`/api/chatting/`);
  },
  room_delete : function ( req, res ){
    let room_id = req.params.id;
    chatting_message.destroy({ where : { room_id : room_id } })
    .then(function(){
        chatting_room.destroy({ where : { id : room_id } }).catch(function(err){ throw err;});
    })
    .catch(function(err){ throw err;});
    res.redirect(`/api/chatting/`);
  },
  room : function (req, res){
    let room_id = req.params.id;
    chatting_room.findOne({ where: { id: room_id } }).then(function(room){
      users.findAll({
        where: {
          [Op.or]:[
            {username:room.author_1},
            {username:room.author_2}
          ]
        }
      }).then(function (user) {
        console.log(user);
        let user1 = user[0];
        let user2 = user[1];
        let writer1 = make_writer(user1.username, user1.pic_location);
        let writer2 = make_writer(user2.username, user2.pic_location);
        let writers = make_writers(writer1, writer2);
        chatting_message.findAll({ where: { room_id: room_id }}).then(function(messagelist){
          res.json({ room: room, writers:writers, messagelist: messagelist, user: req.user ? req.user : 0 })
        }).catch(function(err){
          throw err;
        });
      }).catch(function(err){
        throw err;
      });
    }).catch(function(err){
      throw err;
    });

  }
}
