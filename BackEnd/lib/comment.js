let auth = require('./auth');
let async = require('async');
const { comment } = require('../models');
const { users } = require('../models');
let moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");
moment.locale('ko');

function make_writer(username, profile_picture, pic_location) {
    let writer = {
        username: username,
        profile_picture: profile_picture,
        pic_location: pic_location
    }
    return writer;
}
function make_comment_ob(id, type_board, board_id, description, user, created, is_re_comment, parent_comment) {
    let comment_ob = {
        id: id,
        type_board: type_board,
        board_id: board_id,
        description: description,
        user: user,
        created: created,
        is_re_comment: is_re_comment,
        parent_comment: parent_comment
    }
    return comment_ob;
}

module.exports = {

    comment: function(req, res){

        let id

        async.waterfall([

            /* 변수 값 할당 */
            function (callback) {
                id = req.params.id;
                callback(null);
            },

            function (callback) {
                {
                    comment.findOne({ where: { id: id } }).then(function (comment) {
                        callback(null, comment);
                    }).catch(function (err) { throw err; });
                }
            },

            /* comment response 객체 생성 & 응답 */
            function (comment, callback) {
                let temp = comment;
                users.findOne({ where: { username: temp.author } }).then(function (user) {
                    let writer = make_writer(user.username, user.profile_picture, user.pic_location);
                    let time = moment(temp.created, 'YYYY년MM월DD일HH시mm분ss초').fromNow();
                    comment = make_comment_ob(temp.id, temp.type_board, temp.board_id,
                        temp.description, writer, time, temp.is_re_comment, temp.parent_comment);
                    res.json({ comment: comment, user: req.user ? req.user : 0 });
                }).catch(function (err) { throw err; });
                callback(null);
            }
        ], function (err) {
            if (err) throw (err);
        });        
    },

    create : function(req, res){

        /* 변수 선언 */
        let description;
        let type_board;
        let board_id;
        let is_re_comment;
        let parent_comment;

        async.waterfall([

            /* 변수 값 할당 */
            function (callback) {
                description = req.body.description;
                type_board = req.body.type_board;
                board_id = req.body.board_id;
                is_re_comment = req.body.is_re_comment;
                parent_comment = req.body.parent_comment;
                callback(null);
            },

            /* 로그인한 사람의 요청인지 확인 */
            function (callback) {
                (!auth.isOwner(req, res)) ?
                    res.json({ user: req.user ? req.user : 0 }) :
                    callback(null);
            },

            /* 댓글 생성 */
            function (callback) {
                comment.create({
                    type_board: type_board,  board_id: board_id, description: description, 
                    author: req.user.username, created: moment().format('YYYY년MM월DD일HH시mm분ss초'),
                    is_re_comment: is_re_comment, parent_comment: parent_comment
                }).then(function () {
                    callback(null)
                }).catch(function (err) { throw err; });
            },

            /* Redirection */
            function (callback) {
                res.end()
                callback(null);
            }

        ], function (err) {
            if (err) throw (err);
        });
    },
  
    update : function(req, res){

        /* 변수 선언 */
        let description;
        let id;

        async.waterfall([

            /* 변수 값 할당 */
            function (callback) {
                description = req.body.description;
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
                comment.findOne({ where: { id: id } }).then(function (content) {
                    (auth.sameOwner(req, content.author) === 0) ?
                        res.json({ user: req.user ? req.user : 0 }) :
                        callback(null);
                }).catch(function (err) { throw err; });
            },

            /* 댓글 수정 */
            function (callback) {
                comment.update({
                    description: description, created: moment().format('YYYY년MM월DD일HH시mm분ss초')
                }, { where: { id: id } }).then(function () {
                    callback(null);
                }).catch(function (err) { throw err; });
            },

            /* Redirection */
            function (callback) {
                res.end()
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
                comment.findOne({ where: { id: id } }).then(function (content) {
                    (auth.sameOwner(req, content.author) === 0) ?
                        res.json({ user: req.user ? req.user : 0 }) :
                        callback(null);
                }).catch(function (err) { throw err; });
            },

            /* 댓글 삭제 */
            function (callback) {
                comment.destroy({ where: { id: id } }).catch(function (err) { throw err; });
                res.end()
                callback(null);
            }
        ], function (err) {
            if (err) throw (err);
        });
    }
}
