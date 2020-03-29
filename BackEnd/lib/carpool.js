let auth = require('./auth');
let async = require('async');
const { cal_events } = require('../models');
const { users } = require('../models');
const { guest } = require('../models');
let moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");
moment.locale('ko');

function make_event_ob(id, departure, destination, start, meeting_place, 
    contact, description, created, user, label, guestlist) {

    let event = {
        id: id,
        departure: departure,
        destination: destination,
        start: start,
        meeting_place: meeting_place,
        contact: contact,
        description: description,
        created: created,
        user: user,
        label: label,
        guestlist: guestlist
    }

    return event;
}

module.exports = {

    eventlist : function(req, res){

        let events_response = [];
        let events_db;
        let is_guest;
        let counter = 1;

        async.waterfall([

            function (callback) {
                cal_events.findAll()
                .then(function (results) { events_db = results; })
                .then(function () { 
                    (events_db == [])?
                        callback(null):
                        res.json({ events: null, user: req.user ? req.user : 0 });
                })
                .catch(function (err) { throw err; });
            },

            /* 로그인 하지 않은 유저의 요청 */
            function (callback) {
                if (!auth.isOwner(req, res)){

                    for(let i = 0; i < events_db.length; i++){

                        /* ovedue 값 설정 */
                        let overdue = false;
                        let date = new Date(events_db[i]['start']);
                        let date_today = new Date();
                        let diffHour = (date.getTime() - date_today.getTime()) / (1000*60*60);
                        if (diffHour < 8){
                            overdue = true;
                        }
    
                        /* label 값 설정 */
                        let label;
                        if( events_db[i]['condition'] == '마감' || overdue ){
                            label = 'closed';
                        }
                        else{
                            label = 'active';
                        }

                        /* events obeject 생성 */
                        let user_ob;
                        users.findOne({ where: { email: events_db[i].email } })
                        .then(function (result) { 
                            user_ob = {
                                id: result.dataValues.id,
                                email: result.dataValues.email,
                                username: result.dataValues.username,
                                pic_location: result.dataValues.pic_location
                            };
                        })
                        .catch(function (err) { throw err; });

                        guest.findAll({ where: { event_id: events_db[i].id } })
                        .then(function (guestlist) { 
                            events_response[i] = make_event_ob(events_db[i].id, events_db[i].departure, events_db[i].destination, 
                                events_db[i].start, events_db[i].meeting_place, events_db[i].contact, events_db[i].description, 
                                events_db[i].created, user_ob, label, guestlist);
                        })
                        .then(function () {
                            if (counter == events_db.length){
                                res.json({ events: events_response, user: req.user ? req.user : 0 });
                            }
                            else{
                                counter++;
                            }
                        })
                    }
                }
                else{
                    callback(null);
                }
            },

            /* is_guest 값 설정 */
            function (callback) {
                is_guest = [];

                for(let i = 0; i < events_db.length; i++){
                    is_guest[i] = false;
                    guest.findAll({ where: { event_id: events_db[i].id } })
                    .then(function(guestlist){
                        if (guestlist){
                            for (let j = 0; j < guestlist.length; j++){
                                if (req.user.email == guestlist[j]['email']) {
                                    is_guest[i] = true;
                                    break;
                                }
                            }
                        }
                    })
                }

                callback(null);
            },

            /* 로그인 한 유저의 요청 */
            function (callback) {
                for(let i = 0; i < events_db.length; i++){

                    /* ovedue 값 설정 */
                    let overdue = false;
                    let date = new Date(events_db[i]['start']);
                    let date_today = new Date();
                    let diffHour = (date.getTime() - date_today.getTime()) / (1000*60*60);
                    if (diffHour < 8){
                        overdue = true;
                    }

                    /* label 값 설정 */
                    let label;
                    if( req.user.email == events_db[i]['email']){
                        if ( events_db[i]['condition'] == '마감' || overdue ){
                            label = 'owner_closed';
                        }
                        else{
                            label = 'owner'
                        }
                    }
                    else if( is_guest[i] ){
                        if ( events_db[i]['condition'] == '마감' || overdue ){
                            label = 'guest_closed';
                        }
                        else{
                            label = 'guest'
                        }
                    }
                    else if( events_db[i]['condition'] == '마감' || overdue ){
                        label = 'closed';
                    }
                    else{
                        label = 'active';
                    } 

                    /* events obeject 생성 */
                    let user_ob;
                    users.findOne({ where: { email: events_db[i].email } })
                    .then(function (result) { 
                        user_ob = {
                            id: result.dataValues.id,
                            email: result.dataValues.email,
                            username: result.dataValues.username,
                            pic_location: result.dataValues.pic_location
                        };
                    })
                    .catch(function (err) { throw err; });

                    guest.findAll({ where: { event_id: events_db[i].id } })
                    .then(function (guestlist) { 
                        events_response[i] = make_event_ob(events_db[i].id, events_db[i].departure, events_db[i].destination, 
                            events_db[i].start, events_db[i].meeting_place, events_db[i].contact, events_db[i].description, 
                            events_db[i].created, user_ob, label, guestlist);
                    })
                    .then(function () {
                        if (counter == events_db.length){
                            res.json({ events: events_response, user: req.user ? req.user : 0 });
                        }
                        else{
                            counter++;
                        }
                    })
                }
                callback(null);
            }

        ], function (err) {
            if (err) throw (err);
        });

    },

    create : function(req, res){

        /* 변수 선언 */
        let departure;
        let destination;
        let start;
        let meeting_place;
        let contact;
        let account;
        let description;
        let condition;
        let created;

        async.waterfall([

            /* 변수 값 할당 */
            function (callback) {
                departure = req.body.departure;
                destination = req.body.destination;
                start = req.body.start;
                meeting_place = req.body.meeting_place;
                contact = req.body.contact;
                account = req.body.account;
                description = req.body.description;
                created = moment().format('YYYY년MM월DD일HH시mm분ss초');
                condition = req.body.condition;
                callback(null);
            },

            /* 로그인한 사람의 요청인지 확인 */
            function (callback) {
                (!auth.isOwner(req, res)) ?
                    res.json({ user: req.user ? req.user : 0 }) :
                    callback(null);
            },

            /* 이벤트 생성 */
            function (callback) {
                cal_events.create({ departure : departure, destination : destination, 
                    start : start, meeting_place : meeting_place, contact : contact, account : account, 
                    description : description, email: req.user.email, created: created, condition: condition })
                .then(function(){ callback(null); }).catch(function(err){throw err;});
            },

            /* 응답완료 */
            function (callback) {
                res.end();
                callback(null);
            }

        ], function (err) {
            if (err) throw (err);
        });
    },
  
    update : function(req, res){

        /* 변수 선언 */
        let id;
        let departure;
        let destination;
        let start;
        let meeting_place;
        let contact;
        let account;
        let description;
        let condition;

        async.waterfall([

            /* 변수 값 할당 */
            function (callback) {
                id = req.params.id;
                departure = req.body.departure;
                destination = req.body.destination;
                start = req.body.start;
                meeting_place = req.body.meeting_place;
                contact = req.body.contact;
                account = req.body.account;
                description = req.body.description;
                condition = req.body.condition;
                callback(null);
            },

            /* 로그인한 사람의 요청인지 확인 */
            function (callback) {
                (!auth.isOwner(req, res)) ?
                    res.json({ user: req.user ? req.user : 0 }) :
                    callback(null);
            },

            /* 작성자인지 확인 */
            function (callback) {
                cal_events.findOne({ where: { id: id } }).then(function (content) {
                    (auth.sameOwner(req, content.email) === 0) ?
                        res.json({ user: req.user ? req.user : 0 }) :
                        callback(null);
                }).catch(function (err) { throw err; });
            },

            /* 이벤트 수정 */
            function (callback) {
                cal_events.update({ departure : departure, destination : destination, 
                    start : start, meeting_place : meeting_place, contact : contact, account : account, 
                    description : description, email : req.user.email, condition: condition }, 
                    { where: { id: id } })
                .then(function () { callback(null); }).catch(function (err) { throw err; });
            },

            /* 응답완료 */
            function (callback) {
                res.end();
                callback(null);
            }

        ], function (err) {
            if (err) throw (err);
        });
    },

    delete : function(req, res){

        /* 변수 선언 */
        let id;

        async.waterfall([

            /* 변수 값 할당 */
            function (callback) {
                id = req.params.id;
                callback(null);
            },

            /* 로그인한 사람의 요청인지 확인 */
            function (callback) {
                (!auth.isOwner(req, res)) ?
                    res.json({ user: req.user ? req.user : 0 }) :
                    callback(null);
            },

            /* 작성자인지 확인 */
            function (callback) {
                cal_events.findOne({ where: { id: id } }).then(function (content) {
                    (auth.sameOwner(req, content.email) === 0) ?
                        res.json({ user: req.user ? req.user : 0 }) :
                        callback(null);
                }).catch(function (err) { throw err; });
            },

            /* 댓글 삭제 */
            function (callback) {
                cal_events.destroy({ where: { id: id } })
                .then(function () { res.end(); })
                .catch(function (err) { throw err; });
                callback(null); 
            }
        ], function (err) {
            if (err) throw (err);
        });
    },

    guest_create : function(req, res){

        /* 변수 선언 */
        let event_id;
        let email;
        let created;

        async.waterfall([

            /* 변수 값 할당 */
            function (callback) {
                event_id = req.body.event_id;
                username = req.user.username;
                email = req.user.email;
                created = moment().format('YYYY년MM월DD일HH시mm분ss초');
                callback(null);
            },

            /* 로그인한 사람의 요청인지 확인 */
            function (callback) {
                (!auth.isOwner(req, res)) ?
                    res.json({ user: req.user ? req.user : 0 }) :
                    callback(null);
            },

            /* guest 생성 */
            function (callback) {
                guest.create({ event_id : event_id, username : username, email : email, created : created })
                .then(function(){ callback(null); })
                .catch(function(err){throw err;});
            },

            /* 응답 완료 */
            function (callback) {
                res.end();
                callback(null);
            }

        ], function (err) {
            if (err) throw (err);
        });
    },

    guest_update : function(req, res){

        /* 변수 선언 */
        let id;
        let condition;

        async.waterfall([

            /* 변수 값 할당 */
            function (callback) {
                id = req.params.id;
                condition = req.body.condition;
                callback(null);
            },

            /* 로그인한 사람의 요청인지 확인 */
            function (callback) {
                (!auth.isOwner(req, res)) ?
                    res.json({ user: req.user ? req.user : 0 }) :
                    callback(null);
            },

            /* 작성자인지 확인 */
            function (callback) {
                guest.findOne({ where: { id: id } }).then(function (result) {
                    (auth.sameOwner(req, result.email) === 0) ?
                        res.json({ user: req.user ? req.user : 0 }) :
                        callback(null);
                }).catch(function (err) { throw err; });
            },

            /* guest 상태 수정 */
            function (callback) {
                guest.update({ condition : condition }, { where: { id: id } })
                .then(function(){ callback(null); })
                .catch(function(err){throw err;});
            },

            /* 응답 완료 */
            function (callback) {
                res.end();
                callback(null);
            }

        ], function (err) {
            if (err) throw (err);
        });
    },

    guest_delete : function(req, res){

        /* 변수 선언 */
        let id;

        async.waterfall([

            /* 변수 값 할당 */
            function (callback) {
                id = req.params.id;
                callback(null);
            },

            /* 로그인한 사람의 요청인지 확인 */
            function (callback) {
                (!auth.isOwner(req, res)) ?
                    res.json({ user: req.user ? req.user : 0 }) :
                    callback(null);
            },

            /* 작성자인지 확인 */
            function (callback) {
                guest.findOne({ where: { id: id } }).then(function (result) {
                    (auth.sameOwner(req, result.email) === 0) ?
                        res.json({ user: req.user ? req.user : 0 }) :
                        callback(null);
                }).catch(function (err) { throw err; });
            },

            /* guest 삭제 */
            function (callback) {
                guest.destroy({ where: { id: id } })
                .then(function(){ callback(null); })
                .catch(function(err){throw err;});
            },

            /* 응답 완료 */
            function (callback) {
                res.end();
                callback(null);
            }

        ], function (err) {
            if (err) throw (err);
        });
    },

    guestlist : function(req, res){

        /* 변수 선언 */
        let event_id;

        async.waterfall([

            /* 변수 값 할당 */
            function (callback) {
                event_id = req.params.id;
                callback(null);
            },

            /* 응답 */
            function (callback) {
                guest.findAll({ where: { event_id: event_id } })
                .then(function (results) { res.json({ guestlist: results, user: req.user ? req.user : 0 }); })
                .catch(function (err) { throw err; });
                callback(null);
            }

        ], function (err) {
            if (err) throw (err);
        });
    }
}


