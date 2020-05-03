let auth = require('./auth');
let async = require('async');
const { market_board } = require('../models');
const { networking_board } = require('../models');
const { comment } = require('../models');
const { users } = require('../models');
let moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");
moment.locale('ko');

function make_writer(username, email, pic_location) {
    let writer = {
        username: username,
        email: email,
        pic_location: pic_location
    }
    return writer;
}
function make_comment_ob(id, type_board, board_id, description, user, created, updated, is_re_comment, parent_comment) {
    let comment_ob = {
        id: id,
        type_board: type_board,
        board_id: board_id,
        description: description,
        user: user,
        created: created,
        updated: updated,
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
                users.findOne({ where: { email: temp.email } }).then(function (user) {
                    let writer = make_writer(user.username, user.email, user.pic_location);
                    let created_time = moment(temp.created, 'YYYY년MM월DD일HH시mm분ss초').fromNow();
                    let updated_time = moment(temp.updated, 'YYYY년MM월DD일HH시mm분ss초').fromNow();
                    comment = make_comment_ob(temp.id, temp.type_board, temp.board_id,
                        temp.description, writer, created_time, updated_time, temp.is_re_comment, temp.parent_comment);
                    res.json({ comment: comment, user: req.user ? req.user : 0 });
                }).catch(function (err) { throw err; });
                callback(null);
            }
        ], function (err) {
            if (err) throw (err);
        });
    },

    my_market_comment: function(req, res){

        let board_id_list = [];

        async.waterfall([

            /* 로그인한 사람의 요청인지 확인 */
            function (callback) {
                (!auth.isOwner(req, res)) ?
                    res.json({ user: req.user ? req.user : 0 }) :
                    callback(null);
            },

            /* 해당 게시판에 대해 댓글을 가지고 있는지 확인 */
            function (callback) {
                (auth.hasComment(req, 'market', 'email') === 0) ?
                    res.json({ postlist: undefined, user: req.user ? req.user : 0 }) :
                    callback(null);
            },

            /* 본인이 댓글을 작성한 post의 id 검색 */
            function (callback) {
                comment.findAll({  where: { email: req.user.email, type_board: 'market' } })
                .then(result => {
                    for(let i = 0; i < result.length; i++){
                        board_id_list.push(result[i]['board_id']);
                    }
                    callback(null);
                })
                .catch(function (err) { throw err; });
            },

            /* postlist 응답 */
            function (callback) {
                market_board.findAll({  where: { id: board_id_list }, order: [[ 'id','DESC' ]] })
                .then(result => { res.json({ postlist: result, user: req.user ? req.user : 0 }); })
                .catch(function (err) { throw err; });
                callback(null);
            }

        ], function (err) {
            if (err) throw (err);
        });
    },

    my_networking_comment: function(req, res){

        let board_id_list = [];

        async.waterfall([

            /* 로그인한 사람의 요청인지 확인 */
            function (callback) {
                (!auth.isOwner(req, res)) ?
                    res.json({ user: req.user ? req.user : 0 }) :
                    callback(null);
            },

            /* 해당 게시판에 대해 댓글을 가지고 있는지 확인 */
            function (callback) {
                (auth.hasComment(req, 'networking', 'email') === 0) ?
                    res.json({ postlist: undefined, user: req.user ? req.user : 0 }) :
                    callback(null);
            },

            /* 본인이 댓글을 작성한 post의 id 검색 */
            function (callback) {
                comment.findAll({  where: { email: req.user.email, type_board: 'networking' } })
                .then(result => {
                    for(let i = 0; i < result.length; i++){
                        board_id_list.push(result[i]['board_id']);
                    }
                    callback(null);
                })
                .catch(function (err) { throw err; });
            },

            /* postlist 응답 */
            function (callback) {
                networking_board.findAll({  where: { id: board_id_list }, order: [[ 'id','DESC' ]] })
                .then(result => { res.json({ postlist: result, user: req.user ? req.user : 0 }); })
                .catch(function (err) { throw err; });
                callback(null);
            }

        ], function (err) {
            if (err) throw (err);
        });
    }
}
