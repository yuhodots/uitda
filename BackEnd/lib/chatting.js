/* Module load */
let auth = require('./auth');
let async = require('async');
const { chatting_room } = require('../models');
const { chatting_message } = require('../models');
const { chatting_files } = require('../models');
const { users } = require('../models');
const sequelize = require("sequelize");
const Op = sequelize.Op;
let moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");
moment.locale('ko');

let multerS3 = require('../lib/multerS3')();
let s3 = multerS3.s3;

/* Model method */
function is_chat_text(msg){
    if(msg.type=="text"){
        return true;
    } else {
        return false;
    }
}
function make_writer(username, email, pic_location) {
    let writer = {
        username: username,
        email: email,
        pic_location: pic_location
    }
    return writer;
}
function push_file_list(msg,files){
    var new_msg ={
        id:msg.id,
        room_id:msg.room_id,
        type:msg.type,
        email:msg.email,
        created:msg.created,
        is_unread:msg.is_unread,
        file_list:files
    }
    return new_msg;
}

/* Board method */
module.exports = {
    find_user: function(req, res){
        var user_id = req.params.user_id;
        users.findOne({where:{id:user_id}
        }).then(function(user){
            if(user){
                chatting_room.findOne({where:{
                    [Op.or]:[
                        {
                            email_1:req.user.email,
                            email_2:user.dataValues.email
                        },
                        {
                            email_1:user.dataValues.email,
                            email_2:req.user.email
                        }
                    ]
                }}).then(function(room){
                    if(room){
                        res.redirect(`/api/chatting/room/${room.dataValues.id}?last_id=0`);
                    } else {
                        req.session.opponent_user_id = user_id;
                        res.redirect('/api/chatting/room/0');
                    }
                }).catch(function(err){throw err;});
            }else{
                res.redirect('/api/chatting/room/0')
            }
        }).catch(function(err){throw err;});
    },
    room : function (req, res){
        let last_message_id;
        let opponent_user_id;
        let current_room = {id:"",opponent_user:"",message_list:[]};
        let roomlist =[];
        let min;
        async.waterfall([
            function (callback) { //로그인 확인
                (!auth.isOwner(req, res)) ?
                    res.json({ user: req.user ? req.user : 0 }) :
                    callback(null);
            },
            function (callback) { //변수 입력
                opponent_user_id = req.session.opponent_user_id;
                current_room.id = req.params.id;
                req.session.opponent_user_id = null;
                if(req.query.last_id){
                    last_message_id= Number(req.query.last_id);
                }else{
                    last_message_id = 0;
                }
                callback(null);
            },
            function (callback) {
                if(opponent_user_id){
                    users.findOne({where:{ id:opponent_user_id}}).then(function(user){
                        current_room.opponent_user = user.dataValues;
                        callback(null);
                    }).catch(function(err){throw err;});
                } else{
                    callback(null);
                }
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
            }, // 모든 채팅방
            function (rooms, callback) {  //방이 없을 경우 roomlist = 0 이고 있을경우 방의 정보를 roomlist에 담고 current_room의 정보도 담음
                                            //(room_id가 0일 경우 current_room에는 내용이 안담김.)
                if(rooms.length == 0){
                    res.json({ roomlist: 0, current_room:current_room, user: req.user ? req.user : 0 })
                } else{
                    for (i=0; i<rooms.length;i++){ //상대방 정보 가져오기
                        (function (i){
                            var email2 = "";
                            var unread = 0;
                            var last_chat = 0;
                            chatting_message.findOne({where:{room_id:rooms[i].id},order:[['created','DESC']]}).then(function(msg){
                                if(msg){
                                    if(is_chat_text(msg.dataValues)){
                                        last_chat= msg.dataValues.value;
                                    }else{
                                        last_chat = "사진을 보냈습니다.";
                                    }
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
                }
            },
            function(callback){ //채팅메세지 중 가장 오래된 메세지의 id를 min으로 설정
                chatting_message.min('id',{
                    where:{
                        room_id:current_room.id,
                    }
                }).then(function(num){
                    if(num){
                        min = num;
                        callback(null);
                    } else{
                        min = 0;
                        callback(null);
                    }
                }).catch(function(err){
                    throw err;
                });
            },
            function (callback) { // last_message_id의 값 이전의 메세지를 불러옴.
                if(min){
                    if(last_message_id){
                        chatting_message.findAll({
                            where: {
                                room_id: current_room.id,
                                id:{[Op.lt]:last_message_id}
                            },
                            limit: 20,
                            order:[['created','DESC']]
                        }).then(function(message_list){
                            callback(null,message_list);
                        }).catch(function(err){ throw err; });
                    } else{
                        chatting_message.findAll({
                            where: {
                                room_id: current_room.id,
                            },
                            limit: 20,
                            order:[['created','DESC']]
                        }).then(function(message_list){
                            callback(null,message_list);
                        }).catch(function(err){throw err;});
                    }
                } else{
                    res.json({ roomlist: roomlist, current_room:current_room, isLast:true, user: req.user ? req.user : 0 })
                }
            },
            function(message_list, callback){ // 메세지 리스트를 정리함. 메세지가 이미지 일 경우, 이미지 location값을 담음.
                var is_all_contained = 0;
                for(var i =0; i<message_list.length;i++){
                    current_room.message_list[i]=message_list[message_list.length-i-1].dataValues;
                    current_room.message_list[i].created = moment(current_room.message_list[i].created,'YYYY년MM월DD일HH시mm분ss초').format('YYYY-MM-DDTHH:mm:ss');
                    (function(i){
                        if(current_room.message_list[i].type=="image"){
                            chatting_files.findAll({where:{message_id:current_room.message_list[i].id}}).then(function(files){
                                if(files.length>1){
                                    var temp_file_list = [];
                                    for(var k=0;k<files.length;k++){
                                        temp_file_list[k]=files[k].dataValues.location;
                                    }
                                    current_room.message_list[i]=push_file_list(current_room.message_list[i],temp_file_list);
                                    is_all_contained = is_all_contained + 1;
                                    if(is_all_contained==message_list.length){

                                        callback(null);
                                    }
                                } else {
                                    is_all_contained = is_all_contained + 1;
                                    if(is_all_contained==message_list.length){

                                        callback(null);
                                    }
                                }
                            }).catch(function(err){throw err;});
                        } else {
                            is_all_contained = is_all_contained + 1;
                            if(is_all_contained==message_list.length){
                                callback(null);
                            }
                        }
                    })(i);
                }
            },
            function(callback){
                if(current_room.message_list.length < 20){
                    res.json({ roomlist: roomlist, current_room:current_room, isLast:true, user: req.user ? req.user : 0 })
                } else if(current_room.message_list.length = 20) {
                    if(current_room.message_list[0].id == min){
                        res.json({ roomlist: roomlist, current_room:current_room, isLast:true, user: req.user ? req.user : 0 })
                    }else{
                        res.json({ roomlist: roomlist, current_room:current_room, isLast:false, user: req.user ? req.user : 0 })
                    }
                }
                callback(null);
            }
        ], function (err) {
            if (err) throw (err);
        });
    },
    image_create : function(req, res){
        let room_id;
        let message_id;
        let files;
        let email;
        let time;
        let online_user;
        let email_1;
        let email_2;
        let unread_1;
        let unread_2;
        let is_unread;
        let value;
        let file_list = [];
        let writer;
        async.waterfall([

            /* 변수 값 할당 */
            function (callback) {
                room_id=req.body.room_id;
                files = req.files;
                email = req.body.email;
                time = moment().format('YYYY년MM월DD일HH시mm분ss초');
                type = "image";
                if(req.files.length==1){
                    value = req.files[0].location
                }else{
                    value = req.files.length;
                }
                callback(null);
            },
            function (callback) {
                chatting_room.findOne({where:{id:room_id}})
                .then(function (room){
                    callback(null,room);
                }).catch(function(err){throw err;});
            },
            function (room,callback) {
                email_1 =room.email_1;
                email_2 = room.email_2;
                unread_1 = room.unread_1;
                unread_2 = room.unread_2;
                online_user = room.online_user;
                if (online_user==2){
                    is_unread =  false;
                } else {
                    is_unread = true;
                }
                callback(null);
            },
            function (callback) {
                if(email_1 == email){
                    chatting_room.update({ unread_2:unread_2+1, updated:time}, { where: { id: room_id } })
                    .then(function(){
                        callback(null);
                    }).catch(function (err) { throw err; });
                } else if(email_2 == email){
                    chatting_room.update({ unread_1:unread_1+1, updated:time}, { where: { id: room_id } })
                    .then(function(){
                        callback(null);
                    }).catch(function (err) { throw err; });
                }
            },
            function (callback) {
                chatting_message.create({
                     room_id:room_id, type:type, value:value, email:email, created:time, is_unread: is_unread
                }).then(function(result){
                    message_id =  result.id;
                    callback(null);
                }).catch(function (err) { throw err; });
            },
            function (callback) {
                for(var i =0; i<files.length;i++){
                    chatting_files.create({
                        message_id:message_id, file_id:i, filename: files[i].key, location: files[i].location
                    }).catch(function (err) { throw err; });
                    file_list[i]=files[i].location;
                    if(file_list.length == files.length){
                        callback(null);
                    }
                }
            },
            function (callback) {
                users.findOne({where:{email:email}}).then(function(user){
                    writer = make_writer(user.username,user.email,user.pic_location);
                    time = moment(time,'YYYY년MM월DD일HH시mm분ss초').format('YYYY-MM-DDTHH:mm:ss');
                    req.app.io.of('/chatting').in('room' + room_id).emit('chat image', {writer:writer, message_id:message_id, file_list:file_list, time:time, is_unread:is_unread});
                    res.end();
                    callback(null);
                }).catch(function (err) { throw err; });
            }
        ], function (err) {
            if (err) throw (err);
        });

    }
}
