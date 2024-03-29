let auth = require('./auth');
let async = require('async');
const { chatting_message } = require('../models');
const { chatting_room } = require('../models');
const { comment } = require('../models');
const { users } = require('../models');
const { notification } = require('../models');
const { likey } = require('../models');
const { market_board } = require('../models');
const { networking_board } = require('../models');
const { cal_events } = require('../models');
const { guest } = require('../models');
const sequelize = require("sequelize");
const Op = sequelize.Op;
let moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");
moment.locale('ko');

let multerS3 = require('../lib/multerS3')();
let s3 = multerS3.s3;
let upload = multerS3.upload;

function type_board_assign(type) {
    if (type == 'market') {
        return market_board;
    }
    else if (type == 'networking') {
        return networking_board;
    }
}
function type_comment_assign(is_re_comment) {
    if (!is_re_comment) {
        return "comment";
    }
    else {
        return "recomment";
    }
}
function make_writer(id, username, pic_location,email) {
    let writer = {
        id: id,
        username: username,
        pic_location: pic_location,
        email:email
    }
    return writer;
}
function make_comment_ob(id, type_board, board_id, description, user, created, is_re_comment, parent_comment, is_modified) {
    let comment_ob = {
        id: id,
        type_board: type_board,
        board_id: board_id,
        description: description,
        user: user,
        created: created,
        is_re_comment: is_re_comment,
        parent_comment: parent_comment,
        is_modified: is_modified
    }
    return comment_ob;
}


module.exports = function (io) {

    const home_socket = io.of('/');
    const board_socket = io.of('/board');
    const chatting_socket = io.of('/chatting');
    const carpool_socket = io.of('/carpool');

    //home : notification
    home_socket.on('connection',socket =>{
        console.log('home: a user connected');
        socket.on('socket_id',function({email}){
          console.log('home: socket_id refreshed');
          users.update({ socket_id:socket.id }, { where: { email:email } }).catch(function (err) { throw err; });
        });
        socket.on('chatting count', function({email}){
            console.log('home: chatting count');
            chatting_room.findAll(
                {where:{
                    [Op.or]:[
                        {email_1:email},
                        {email_2:email}
                    ]
                }
            }).then(function(rooms){
                var unread = 0;
                for(i=0;i<rooms.length;i++){
                    if((rooms[i].email_1 == email)&&(rooms[i].unread_1>0)){
                        unread = unread + 1;
                    }else if ((rooms[i].email_2 == email)&&(rooms[i].unread_2>0)) {
                        unread = unread +1;
                    }
                    if(i==rooms.length-1){
                        home_socket.emit('chatting count', {num_of_chatting_message:unread});
                    }
                }
            }).catch(function(err){ throw err; })
        });
        socket.on('notification count', function({email}){
            console.log('home: notification counted');
            notification.findAll({where:{email_2:email, is_unread:true}}).then(function(notifications){
                var notification_length = notifications.length;
                home_socket.emit('notification count', {num_of_notification:notification_length});
            }).catch(function(err){ throw err; })
        });
        socket.on('notification create',function({email, board_id, type, is_re_comment, parent_comment}){
            console.log('home: notification created');
            let time;
            let time_dif;
            let writer;
            let type_board;
            let comment_type;
            async.waterfall([
                function (callback) {
                    time= moment().format('YYYY년MM월DD일HH시mm분ss초');
                    time_dif = moment(time, 'YYYY년MM월DD일HH시mm분ss초').fromNow();
                    type_board = type_board_assign(type);
                    comment_type = type_comment_assign(is_re_comment);
                    callback(null);
                },
                function (callback) {
                    users.findOne({
                        where:{email:email}
                    }).then(function(user){
                        writer = make_writer(user.id, user.username,user.pic_location,user.email);
                        callback(null);
                    })
                },
                function (callback) {
                    if(!is_re_comment){
                        type_board.findOne({ where:{id:board_id}}).then(function(board){
                            users.findOne({ where:{email:board.email}}).then(function(whom){
                                callback(null,whom);
                            }).catch(function(err){throw err;})
                        }).catch(function(err){throw err;})
                    } else {
                        comment.findOne({where:{ id:parent_comment }}).then(function(board){
                            users.findOne({
                                where:{ email: board.email
                                }}).then(function(whom){
                                    callback(null,whom);
                                }).catch(function (err) { throw err; });
                            }).catch(function (err) { throw err; });
                    }
                },
                function (whom, callback) {
                    notification.create({
                        board_id: board_id, email_1:email, email_2:whom.email, comment_type:comment_type, created:time, is_unread:true
                    }).then(function(){
                        callback(null,whom);
                    }).catch(function (err) { throw err; });
                },
                function (whom, callback) {
                    if(whom.socket_id){
                        home_socket.to(whom.socket_id).emit('notification create',{board_id:board_id, type:type, writer:writer, time:time_dif, is_recomment:is_re_comment})
                    }
                    callback(null);
                },
            ], function (err) {
                if (err) throw (err);
            });
        });
        socket.on('notification show',function({email}){
            console.log('home: notification show');
            notification.findAll({order:[['created','DESC']], where:{email_2:email}}).then(function(notifications){
                var notification_list = [];
                for(i=0;i<notifications.length;i++){
                    (function(i){
                        users.findOne({where:{email:notifications[i].email_1}}).then(function(user){
                            var writer = make_writer(user.id, user.username, user.pic_location, user.email);
                            var notification_ob = {
                                board_id:notifications[i].board_id,
                                writer: writer,
                                comment_type:notifications[i].comment_type,
                                created:moment(notifications[i].created,'YYYY년MM월DD일HH시mm분ss초').fromNow(),
                                is_unread:notifications[i].is_unread
                            };
                            notification_list[i] = notification_ob;
                            if(notifications.length == notification_list.length){
                                notification.update({is_unread:false},{where:{email_2:email,is_unread:true}}).then(function(){
                                    home_socket.emit('notification show', {notification_list:notification_list});
                                }).catch(function(err){ throw err; });
                            }
                        }).catch(function(err){ throw err; })
                    })(i)
                }
            }).catch(function(err){ throw err; })

        });
        socket.on('disconnect', function(){
            console.log('home: a user disconnected');
            users.update({ socket_id:"" }, { where: { socket_id:socket.id } }).catch(function (err) { throw err; });
        });
    })

    //board : comment,likey
    board_socket.on('connection',socket =>{
        console.log('board: a user connected');
        socket.on('room in', function({type_board, posting_id}){
            console.log('board: room in '+ posting_id)
            socket.posting_id = posting_id;
            socket.join(type_board + posting_id);
        });
        socket.on('room out', function({type_board, posting_id}){
            console.log('board: room out ' + socket.posting_id);
            socket.leave(type_board + posting_id);
        });
        socket.on('comment create', function({email, description, type_board, board_id, is_re_comment, parent_comment}){
            console.log('board: comment created');
            var time = moment().format('YYYY년MM월DD일HH시mm분ss초');
            users.findOne({where:{email:email}}).then(function(user){
                comment.create({
                    type_board: type_board,  board_id: board_id, description: description,author: user.username, email: email,
                    created: time, updated: time, is_re_comment: is_re_comment, parent_comment: parent_comment
                }).then(function (comment) {
                    var new_comment = {
                        id:comment.dataValues.id,
                        type_board:comment.dataValues.type_board,
                        board_id:comment.dataValues.board_id,
                        description:comment.dataValues.description,
                        created:moment(comment.dataValues.created,'YYYY년MM월DD일HH시mm분ss초').format('YYYY-MM-DDTHH:mm:ss'),
                        updated:moment(comment.dataValues.updated,'YYYY년MM월DD일HH시mm분ss초').format('YYYY-MM-DDTHH:mm:ss'),
                        is_re_comment:comment.dataValues.is_re_comment,
                        parent_comment:comment.dataValues.parent_comment
                    };
                    board_socket.in(type_board + board_id).emit('comment create', {user:user.dataValues, comment:new_comment});
                }).catch(function (err) { throw err; });
            }).catch(function (err) { throw err; });
        });
        socket.on('comment update', function({email, comment_id, description}){
            console.log('board: comment updated');
            var updated_time = moment().format('YYYY년MM월DD일HH시mm분ss초');
            comment.findOne({ where: { id: comment_id } }).then(function (content) {
                if(email == content.email){
                    comment.update({
                        description: description, updated: updated_time
                    }, { where: { id: comment_id } })
                    .then(function(){
                        var updated = moment(updated_time,'YYYY년MM월DD일HH시mm분ss초').format('YYYY-MM-DDTHH:mm:ss');
                        board_socket.in(content.type_board + content.board_id).emit('comment update', {comment_id:comment_id, description:description, updated:updated});
                    }).catch(function (err) { throw err; });
                }
            }).catch(function (err) { throw err; });
        });
        socket.on('comment delete', function({email, comment_id}){
            console.log('board: comment deleted');
            comment.findOne({ where: { id: comment_id } }).then(function (content) {
                if(email == content.email){
                    comment.destroy({ where: { id: comment_id } }).then(function(){
                        board_socket.in(content.dataValues.type_board +content.dataValues.board_id).emit('comment delete',{comment_id:comment_id});
                    }).catch(function (err) { throw err; });
                }
            }).catch(function (err) { throw err; });
        });
        socket.on('comment list', function({board_id, type_board}){
            console.log('board: comment list');
            comment.findAll({ where: { board_id: board_id, type_board: type_board } }).then(function(comments){
                var comment_list = [];
                for (let i = 0; i < comments.length; i++) {
                    users.findOne({ where: { email: comments[i].email } }).then(function (user) {
                        let writer = make_writer(user.id, user.username, user.email, user.pic_location);
                        let created_time = moment(comments[i].created, 'YYYY년MM월DD일HH시mm분ss초').fromNow();
                        let updated_time = moment(comments[i].updated, 'YYYY년MM월DD일HH시mm분ss초').fromNow();
                        comment_ob = make_comment_ob(comments[i].id, comments[i].type_board, comments[i].board_id,
                            comments[i].description, writer, created_time, updated_time, comments[i].is_re_comment, comments[i].parent_comment);
                        comment_list[i] = comment_ob;
                        if(comment_list.length == comments.length){
                            board_socket.emit('comment list', {comment_list:comment_list})
                        }
                    }).catch(function (err) { throw err; });
                }
            }).catch(function (err) { throw err; });
        });
        socket.on('likey push', function({email, type_board, board_id, author}){
            likey.create({
                type_board:type_board,
                board_id:board_id,
                author: author,
                email: email,
                created: moment().format('YYYY년MM월DD일HH시mm분ss초')
            }).catch(function (err) { throw err; });
        });
        socket.on('likey cancel', function({email, type_board, board_id}){
            likey.destroy({
                where: {
                    type_board:type_board,
                    board_id:board_id,
                    email:email
                }
            }).catch(function (err) { throw err; });
        });
        socket.on('disconnect', function(){
            console.log('board: a user disconnected');
        });
    })

    // chatting
    chatting_socket.on('connection', socket =>{
        console.log('chatting: a user connected');
        socket.on('room in', function({room_id, email}){
            console.log('chatting: room in '+ room_id)
            socket.room_id = room_id;
            chatting_message.update({ is_unread:false },
                { where:
                    { room_id: room_id,
                      is_unread: true,
                      email: {
                          [Op.not]: email
                      }
                    }
                }
            ).then(function(){
                chatting_room.findOne({where:{id:room_id}})
                .then(function (room){
                    var email_1 =room.email_1;
                    var email_2 = room.email_2;
                    var unread_1 = room.unread_1;
                    var unread_2 = room.unread_2;
                    var online_user = room.online_user+1;
                    if(email_1==email){
                        chatting_room.update({ unread_1:0, online_user:online_user}, { where: { id: room_id } })
                        .catch(function (err) { throw err; });
                    } else if(email_2==email){
                        chatting_room.update({ unread_2:0, online_user:online_user}, { where: { id: room_id } })
                        .catch(function (err) { throw err; });
                    }
                    socket.join('room' + room_id);
                })
                .catch(function (err) { throw err; });
            }).catch(function(err){
                throw err;
            });
        });
        socket.on('room out', function({room_id,email}){
            socket.leave('room'+room_id);
            console.log('chatting: room out ' + socket.room_id);
            chatting_room.findOne({where:{id:room_id}})
            .then(function (room){
                var online_user = room.online_user;
                chatting_room.update({ online_user:online_user-1 }, { where: { id: room_id } })
                .catch(function (err) { throw err; });
            }).catch(function (err) { throw err; });
        });
        socket.on('chat message', function({room_id, email,message}){
            let writer;
            let time;
            let online_user;
            let email_1;
            let email_2;
            let unread_1;
            let unread_2;
            let is_unread;
            let type;
            let value;
            async.waterfall([
                function (callback) {
                    chatting_room.findOne({where:{id:room_id}})
                    .then(function (room){
                        callback(null,room);
                    }).catch(function(err){throw err;});
                },
                function (room,callback) {
                    time = moment().format('YYYY년MM월DD일HH시mm분ss초');
                    email_1 =room.email_1;
                    email_2 = room.email_2;
                    unread_1 = room.unread_1;
                    unread_2 = room.unread_2;
                    online_user = room.online_user;
                    type = "text";
                    value = message;
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
                        callback(null, result.id);
                    }).catch(function (err) { throw err; });
                },
                function (message_id, callback) {
                    users.findOne({where:{email:email}}).then(function(user){
                        writer = make_writer(user.id, user.username, user.pic_location,user.email);
                        time = moment(time,'YYYY년MM월DD일HH시mm분ss초').format('YYYY-MM-DDTHH:mm:ss');
                        chatting_socket.in('room' + room_id).emit('chat message', {writer:writer, message_id:message_id, message:message, time:time, is_unread:is_unread});
                        callback(null);
                    }).catch(function (err) { throw err; });
                }
            ], function (err) {
                if (err) throw (err);
            });
        });
        socket.on('room list', function({email}){
            async.waterfall([
                function (callback) {
                    chatting_room.findAll({
                        order:[['updated','DESC']],
                        where:{
                            [Op.or]:[
                                {email_1:email},
                                {email_2:email}
                            ]
                        }
                    }).then(function(rooms){
                        callback(null,rooms)
                    }).catch(function(err){throw err;});
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
                            if(rooms[i].email_1==email){
                                email2 = rooms[i].email_2;
                                unread = rooms[i].unread_1;
                            } else if(rooms[i].email_2== email){
                                email2 = rooms[i].email_1;
                                unread = rooms[i].unread_2;
                            }
                            users.findOne({where:{ email: email2}}).then(function(user){
                                var room = {id:"",updated:"",unread:"",user:""};
                                room.id = rooms[i].id;
                                room.updated = moment(rooms[i].updated,'YYYY년MM월DD일HH시mm분ss초').format('YYYY-MM-DDTHH:mm:ss');
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
                    chatting_socket.emit('room list', {roomlist:roomlist});
                    callback(null);
                }
            ], function (err) {
                if (err) throw (err);
            });
        });
        socket.on('room create', function({email_1, email_2}){
            time = moment().format('YYYY년MM월DD일HH시mm분ss초');
            chatting_room.create({
                email_1:email_1, email_2:email_2, updated:time
            }).then(function(result){
                console.log('chatting: room created '+ result.id);
                users.findOne({where:{ email: email_2}}).then(function(user){
                    var room = {id:"",updated:"",unread:"",user:""};
                    room.id = result.id;
                    room.updated = time;
                    room.unread = 0;
                    room.user = user.dataValues;
                    chatting_socket.emit('room create', {room:room});
                }).catch(function(err){throw err;});
            }).catch(function(err){throw err;});
        });
        socket.on('room delete', function({room_id, email}){
            console.log('chatting: room deleted '+ room_id);
            chatting_room.findOne({where : {id : room_id}}).then(function(room){
                if( (email == room.email_1) || (email == room.email_2)){
                    chatting_message.findAll({where:{room_id:room_id}}).then(function(msgs){
                        if(msgs){
                            for(var i=0;i<msgs.length;i++){
                                if(msgs[i].type=="image"){
                                    chatting_files.findAll({where:{message_id:msgs[i].id}}).then(function(filelist){
                                        if(filelist.length){
                                            for (let i = 0; i < filelist.length; i++) {
                                                s3.deleteObject(
                                                    { Bucket: "uitda.net", Key: filelist[i].filename },
                                                    (err, data) => {
                                                        if (err) throw err;
                                                        console.log(data);
                                                    }
                                                );
                                            }
                                        }
                                        chatting_files.destroy({where:{message_id:msgs[i].id}}).catch(function(err){ throw err;});
                                    }).catch(function(err){ throw err;});
                                }
                            }
                        }
                    }).catch(function(err){ throw err;});
                    chatting_message.destroy({ where : { room_id : room_id } }).then(function(){
                        chatting_room.destroy({ where : { id : room_id } }).catch(function(err){ throw err;});
                    }).catch(function(err){ throw err;});
                }
            }).catch(function(err){ throw err;});
        });
        socket.on('disconnect', function(){
            console.log('chatting: a user disconnected');
            if(socket.room_id){
                console.log('chatting: room out ' + socket.room_id + ' (diconnect)')
                var room_id = socket.room_id;
                socket.leave('room'+room_id);
                chatting_room.findOne({where:{id:room_id}})
                .then(function (room){
                    var online_user = room.online_user-1;
                    chatting_room.update({ online_user:online_user}, { where: { id: room_id } })
                    .catch(function (err) { throw err; });
                }).catch(function (err) { throw err; });
            }
        });
    });

    //carpool
    carpool_socket.on('connection', socket =>{
        console.log('carpool: a user connected');
        socket.on('event create', function({email, departure, destination, start, meeting_place, contact, description, condition}){
            //카풀 이벤트 생성
            console.log('carpool: event created')
            let created = moment().format('YYYY년MM월DD일HH시mm분ss초');
            cal_events.create({ departure : departure, destination : destination,
                start : start, meeting_place : meeting_place, contact : contact,
                description : description, email: email, created: created, condition: condition })
            .then(function(new_event){
                carpool_socket.emit('event create', {event:new_event.dataValues});
            }).catch(function(err){throw err;});
        });
        socket.on('event update', function({email, id, departure, destination, start, meeting_place, contact, description, condition}){
            //카풀 이벤트 수정
            console.log('carpool: event updated')
            async.waterfall([
                /* 작성자인지 확인 */
                function (callback) {
                    cal_events.findOne({ where: { id: id } }).then(function (content) {
                        if(email==content.email){
                            callback(null,true);
                        }else{
                            callback(null,false);
                        }
                    }).catch(function (err) { throw err; });
                },

                /* 이벤트 수정 */
                function (sameOwner, callback) {
                    if(sameOwner){
                        cal_events.update({ departure : departure, destination : destination,
                            start : start, meeting_place : meeting_place, contact : contact,
                            description : description, email : email, condition: condition },
                            { where: { id: id }
                        }).then(function () {
                            var new_event = {
                                id: id,
                                departure: departure,
                                destination: destination,
                                start: start,
                                meeting_place: meeting_place,
                                contact: contact,
                                description: description,
                                email:email,
                                condition:condition
                            };
                            carpool_socket.emit('event update', {event:new_event});
                            callback(null);
                        }).catch(function (err) { throw err; });
                    } else {
                        callback(null);
                    }
                }
            ], function (err) {
                if (err) throw (err);
            });

        });
        socket.on('event delete', function({email, id}){
            //카풀 이벤트 삭제
            console.log('carpool: event deleted')
            async.waterfall([
                /* 작성자인지 확인 */
                function (callback) {
                    cal_events.findOne({ where: { id: id } }).then(function (content) {
                        if(email == content.email){
                            callback(null,true);
                        }else{
                            callback(null,false);
                        }
                    }).catch(function (err) { throw err; });
                },

                /* 댓글 삭제 */
                function (sameOwner, callback) {
                    if(sameOwner){
                        cal_events.destroy({ where: { id: id }
                        }).then(function () {
                            carpool_socket.emit('event delete', {event_id:id});
                        }).catch(function (err) { throw err; });
                        callback(null);
                    } else{
                        callback(null);
                    }
                }
            ], function (err) {
                if (err) throw (err);
            });
        });
        socket.on('guest create', function({email, event_id}){
            console.log('carpool: guest created');
            let username;
            let created;
            async.waterfall([

                /* 변수 값 할당 */
                function (callback) {
                    created = moment().format('YYYY년MM월DD일HH시mm분ss초');
                    callback(null);
                },

                function (callback) {
                    users.findOne({where:{email:email}}).then(function(user){
                        username = user.username;
                        callback(null);
                    }).catch(function(err){
                        throw err;
                    });
                },

                /* guest 생성 */
                function (callback) {
                    guest.create({ event_id : event_id, username : username, email : email, created : created })
                    .then(function(guest){
                        carpool_socket.emit('guest create', {guest:guest.dataValues})
                        callback(null);
                     })
                    .catch(function(err){throw err;});
                },

            ], function (err) {
                if (err) throw (err);
            });
        });
        socket.on('guest update', function({email, id, condition}){
            console.log('carpool: guest updated');
            async.waterfall([

                /* 작성자인지 확인 */
                function (callback) {
                    guest.findOne({ where: { id: id } }).then(function (result) {
                        if(result.email == email){
                            callback(null,true);
                        } else {
                            callback(null, false);
                        }
                    }).catch(function (err) { throw err; });
                },

                /* guest 상태 수정 */
                function (sameOwner, callback) {
                    if(sameOwner){
                        guest.update({ condition : condition }, { where: { id: id } })
                        .then(function(){
                            carpool_socket.emit('guest update', {id: id, condition: condition});
                        }).catch(function(err){throw err;});
                    } else {
                        callback(null);
                    }
                }
            ], function (err) {
                if (err) throw (err);
            });
        });
        socket.on('guest delete', function({email, id}){
            console.log('carpool: guest deleted');
            async.waterfall([

                /* 작성자인지 확인 */
                function (callback) {
                    guest.findOne({ where: { id: id } }).then(function (result) {
                        if(result.email == email){
                            callback(null,true);
                        } else {
                            callback(null, false);
                        }
                    }).catch(function (err) { throw err; });
                },

                /* guest 삭제 */
                function (sameOwner, callback) {
                    if(sameOwner){
                        guest.destroy({ where: { id: id } })
                        .then(function(){
                            carpool_socket.emit('guest delete', {id:id})
                        })
                        .catch(function(err){throw err;});
                    } else {
                        callback(null);
                    }
                }

            ], function (err) {
                if (err) throw (err);
            });

        });
        socket.on('disconnect', function({}){
            console.log('carpool: a user disconnected');
        });

    });

    return io;
}
