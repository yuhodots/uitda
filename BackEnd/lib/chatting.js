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


/* Board method */
module.exports = {
    find_user: function(req, res){
        var user_id = req.params.user_id;
        users.findAll({where:{id:user_id}
        }).then(function(user){
            chatting_room.findOne({where:{
                [Op.or]:[
                    {
                        email_1:req.user.email,
                        email_2:user[0].dataValues.email
                    },
                    {
                        email_1:user[0].dataValues.email,
                        email_2:req.user.email
                    }
                ]
            }}).then(function(room){
                if(room){
                    res.redirect(`/api/chatting/room/${room.dataValues.id}`);
                } else {
                    req.session.opponent_user_id = user_id;
                    res.redirect('/api/chatting/room/0')
                }
            }).catch(function(err){throw err;});
        }).catch(function(err){throw err;});
    },
    room : function (req, res){
        let last_message_id = Number(req.query.last_id);
        let opponent_user_id;
        var current_room = {id:"",opponent_user:"",message_list:[]};
        var roomlist =[];
        async.waterfall([
            function (callback) {
                (!auth.isOwner(req, res)) ?
                    res.json({ user: req.user ? req.user : 0 }) :
                    callback(null);
            },
            function (callback) {
                opponent_user_id = req.session.opponent_user_id;
                current_room.id = req.params.id;
                req.session.opponent_user_id = null;
                callback(null);
            },
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
                if(opponent_user_id){
                    users.findOne({where:{ id:opponent_user_id}}).then(function(user){
                        current_room.opponent_user = user.dataValues;
                    }).catch(function(err){throw err;});
                }
                if(rooms.length == 0){
                    res.json({ roomlist: 0, current_room:current_room, user: req.user ? req.user : 0 })
                }
                for (i=0; i<rooms.length;i++){ //상대방 정보 가져오기
                    (function (i){
                        var email2 = "";
                        var unread = 0;
                        var last_chat = 0;
                        chatting_message.findOne({where:{room_id:rooms[i].id},order:[['created','DESC']]}).then(function(msg){
                            if(msg){
                                last_chat= msg.dataValues.description;
                            }
                        }).catch(function(err){throw err;})
                        if(rooms[i].email_1==req.user.email){
                            email2 = rooms[i].email_2;
                            unread = rooms[i].unread_1;
                        } else if(rooms[i].email_2== req.user.email){
                            email2 = rooms[i].email_1;
                            unread = rooms[i].unread_2;
                        }
                        users.findOne({where:{ email: email2}}).then(function(user){
                            var room = {
                                id: rooms[i].id,
                                updated: moment(rooms[i].updated,'YYYY년MM월DD일HH시mm분ss초').format('YYYY-MM-DDTHH:mm:ss'),
                                unread: unread,
                                opponent_user: user.dataValues,
                                last_chat: last_chat
                            };
                            roomlist[i]=room;
                            if(room.id == current_room.id){
                                current_room.opponent_user = user.dataValues;
                            }
                            if(roomlist.length==rooms.length){
                                if(current_room.id == 0){
                                    res.json({ roomlist: roomlist, current_room:current_room, user: req.user ? req.user : 0 })
                                }else{
                                    callback(null)
                                }
                            }
                        }).catch(function(err){throw err;});
                    })(i)
                }
            },
            function(callback){
                chatting_message.min('id',{
                    where:{
                        room_id:current_room.id,
                    }
                }).then(function(min){
                    if(min){
                        callback(null, min);
                    } else{
                        callback(null, 0);
                    }
                }).catch(function(err){
                    throw err;
                });
            },
            function (min, callback) {
                if(min){
                    chatting_message.findAll({
                        where: {
                            room_id: current_room.id,
                            id:{[Op.lt]:last_message_id}
                        },
                        limit: 20,
                        order:[['created','DESC']]
                    }).then(function(message_list){
                        current_room.message_list = message_list.reverse();
                        for(var i=0;i<current_room.message_list.length;i++){
                            current_room.message_list[i].created = moment(current_room.message_list[i].created,'YYYY년MM월DD일HH시mm분ss초').format('YYYY-MM-DDTHH:mm:ss');
                            if(i == current_room.message_list.length-1){
                                if(message_list.length < 20){
                                    res.json({ roomlist: roomlist, current_room:current_room, isLast:true, user: req.user ? req.user : 0 })
                                } else if(message_list.length = 20) {
                                    if(message_list[0].id == min){
                                        res.json({ roomlist: roomlist, current_room:current_room, isLast:true, user: req.user ? req.user : 0 })
                                    }else{
                                        res.json({ roomlist: roomlist, current_room:current_room, isLast:false, user: req.user ? req.user : 0 })
                                    }
                                }
                            }
                        }
                        callback(null);
                    }).catch(function(err){
                        throw err;
                    });
                } else{
                    res.json({ roomlist: roomlist, current_room:current_room, isLast:true, user: req.user ? req.user : 0 })
                }

            }
        ], function (err) {
            if (err) throw (err);
        });
    }
}
