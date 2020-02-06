let auth = require('./auth');
let async = require('async');
const { cal_events } = require('../models');
let moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");
moment.locale('ko');

module.exports = {

    eventlist : function(req, res){

        /* 모든 이벤트 응답 */
        cal_events.findAll()
        .then(function (results) { res.json({ events: results, user: req.user ? req.user : 0 }); })
        .catch(function (err) { throw err; });
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
                    description : description, username : req.user.username })
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
                    (auth.sameOwner(req, content.username) === 0) ?
                        res.json({ user: req.user ? req.user : 0 }) :
                        callback(null);
                }).catch(function (err) { throw err; });
            },

            /* 이벤트 수정 */
            function (callback) {
                cal_events.update({ title : title, departure : departure, destination : destination, 
                    start : start, meeting_place : meeting_place, contact : contact, account : account, 
                    description : description, username : req.user.username }, { where: { id: id } })
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
                    (auth.sameOwner(req, content.username) === 0) ?
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


