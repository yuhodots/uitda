let auth = require('./auth');
let async = require('async');
const { cal_events } = require('../models');
let moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");
moment.locale('ko');

module.exports = {

    eventlist : function(req, res){

        let events;
        let counter = 0;

        async.waterfall([

            function (callback) {
                cal_events.findAll()
                .then(function (results) { events = results; })
                .then(function () { callback(null); })
                .catch(function (err) { throw err; });
            },

            /* 로그인 하지 않은 유저의 요청 */
            function (callback) {
                if (!auth.isOwner(req, res)){

                    for(let i = 0; i < events.length; i++){

                        counter++;

                        /* ovedue 값 설정 */
                        let overdue = false;
                        let date = new Date(events[i]['start']);
                        let date_today = new Date();
                        let diffHour = (date.getTime() - date_today.getTime()) / (1000*60*60);
                        if (diffHour < 8){
                            overdue = true;
                        }
    
                        /* 1. 마감된 방 */
                        if( events[i]['condition'] == ' 마감' || overdue ){
                            events[i].dataValues.label = 'closed';
                        }
    
                        /* 2. 모집중인 방 */
                        else{
                            events[i].dataValues.label = 'active';
                        }

                        if (counter == events.length){
                            res.json({ events: events, user: req.user ? req.user : 0 });
                        }
                    }
                }
                else{
                    callback(null);
                }
            },

            /* 로그인 한 유저의 요청 */
            function (callback) {
                for(let i = 0; i < events.length; i++){

                    counter++;

                    /* guest 값 설정 */
                    // let guest = false;
                    // for (let j = 0; j < events[i]['guest_list'].length; j++){
                    //     if (req.user.email == events[i]['guest_list'][j]) {
                    //         guest = true;
                    //     }
                    // }

                    /* ovedue 값 설정 */
                    let overdue = false;
                    let date = new Date(events[i]['start']);
                    let date_today = new Date();
                    let diffHour = (date.getTime() - date_today.getTime()) / (1000*60*60);
                    if (diffHour < 8){
                        overdue = true;
                    }

                    /* 1. 내가 방장인 방 */
                    if( req.user.email == events[i]['email']){
                        events[i].dataValues.label = 'owner';
                    }

                    /* 2. 참가 신청한 방 */
                    // else if( applied ){
                    //     events[i]['label'] = 'applied';
                    // }

                    /* 3. 마감된 방 */
                    else if( events[i]['condition'] == ' 마감' || overdue ){
                        events[i].dataValues.label = 'closed';
                    }

                    /* 4. 모집중인 방 */
                    else{
                        events[i].dataValues.label = 'active';
                    } 

                    if (counter == events.length){
                        res.json({ events: events, user: req.user ? req.user : 0 });
                        callback(null);
                    }
                }
            }

        ], function (err) {
            if (err) throw (err);
        });

    },

    create : function(req, res){

        /* 변수 선언 */
        let title;
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
                title = req.body.title;
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

            /* 이벤트 생성 */
            function (callback) {
                cal_events.create({ title : title, departure : departure, destination : destination, 
                    start : start, meeting_place : meeting_place, contact : contact, account : account, 
                    description : description, username : req.user.username, email: req.user.email, condition: condition })
                .then(function(){ callback(null); }).catch(function(err){throw err;});
            },

            /* 응답완료 */
            function (callback) {
                res.end();      // 일단은 res.end() 처리해놓음
                callback(null);
            }

        ], function (err) {
            if (err) throw (err);
        });
    },
  
    update : function(req, res){

        /* 변수 선언 */
        let id;
        let title;
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
                title = req.body.title;
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
                cal_events.update({ title : title, departure : departure, destination : destination, 
                    start : start, meeting_place : meeting_place, contact : contact, account : account, 
                    description : description, username : req.user.username, email : req.user.email, condition: condition }, 
                    { where: { id: id } })
                .then(function () { callback(null); }).catch(function (err) { throw err; });
            },

            /* 응답완료 */
            function (callback) {
                res.end()       // 일단은 res.end() 처리해놓음
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
                .then(function () { res.end(); })       // 일단은 res.end() 처리해놓음
                .catch(function (err) { throw err; });
                callback(null); 
            }
        ], function (err) {
            if (err) throw (err);
        });
    }
}


