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


/* Model method */
function make_writer(username, pic_location, email) {
    let writer = {
        username: username,
        pic_location: pic_location,
        email:email
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
        async.waterfall([
            function (callback) {
                chatting_room.findAll({
                    order:[['updated','DESC']],
                    where:{
                        [Op.or]:[
                            {email_1:req.user.email},
                            {email_2:req.user.email}
                        ]
                    }
                }).then(function(rooms){
                    callback(null,rooms)
                }).catch(function(err){ throw err;});
            },
            function (rooms, callback) {
                var roomlist =[];
                if(rooms.length == 0){
                    callback(null, roomlist);
                }
                for (i=0; i<rooms.length;i++){ //상대방 정보 가져오기
                    (function (i){
                        var email2 = "";
                        var unread = 0;
                        if(rooms[i].email_1==req.user.email){
                            email2 = rooms[i].email_2;
                            unread = rooms[i].unread_1;
                        } else if(rooms[i].email_2== req.user.email){
                            email2 = rooms[i].email_1;
                            unread = rooms[i].unread_2;
                        }
                        users.findOne({where:{ email: email2}}).then(function(user){
                            var room = {id:"",updated:"",unread:"",user:""};
                            room.id = rooms[i].id;
                            room.updated = rooms[i].updated;
                            room.unread = unread;
                            room.user = user.dataValues;
                            roomlist[i]=room;
                            if(roomlist.length==rooms.length){
                                callback(null,roomlist)
                            }
                        }).catch(function(err){throw err;});
                    })(i)
                }
            },
            function(roomlist,callback){
                res.json({roomlist:roomlist, user: req.user ? req.user : 0});
                callback(null);
            }
        ], function (err) {
            if (err) throw (err);
        });
    },
    room : function (req, res){
        let room_id;
        let user1;
        let user2;
        let writer1;
        let writer2;
        let writers;
        async.waterfall([
            function (callback) {
                room_id = req.params.id;
                callback(null);
            },
            function (callback) {
                (!auth.isOwner(req, res)) ?
                    res.json({ user: req.user ? req.user : 0 }) :
                    callback(null);
            },
            function (callback) {
                chatting_message.findAll({ where: { room_id: room_id }}).then(function(messagelist){
                    callback(null,messagelist);
                }).catch(function(err){
                    throw err;
                });
            },
            function (messagelist, callback) {
              chatting_room.findOne({ where: { id: room_id } }).then(function(room){
                  if(room){
                    users.findAll({
                        where: {
                            [Op.or]:[
                                {email:room.email_1},
                                {email:room.email_2}
                            ]
                        }
                    }).then(function(user) {
                        user1 = user[0].dataValues;
                        user2 = user[1].dataValues;
                        if(auth.sameOwner(req, user1.email) || auth.sameOwner(req, user2.email)){
                            writer1 = make_writer(user1.username, user1.pic_location,user1.email);
                            writer2 = make_writer(user2.username, user2.pic_location,user2.email);
                            writers = make_writers(writer1, writer2);
                            res.json({ room: room, writers:writers, messagelist: messagelist, user: req.user ? req.user : 0 })
                        } else{
                            res.json({ user: req.user ? req.user : 0 })
                        }
                        callback(null)
                    }).catch(function(err){
                        throw err;
                    });
                  }else{
                      res.statusCode = 404; // 404 상태 코드
                      res.end('주소가 없습니다');
                  }
              }).catch(function(err){
                  throw err;
              });

            },
        ], function (err) {
            if (err) throw (err);
        });
    }
}
