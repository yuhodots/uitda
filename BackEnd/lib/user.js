/* Module load */
let auth = require('./auth');
let async = require('async');
const { market_board } = require('../models');
const { market_files } = require('../models');
const { networking_board } = require('../models');
const { networking_files } = require('../models');
const { cal_events } = require('../models');
const { comment } = require('../models');
const { users } = require('../models');

module.exports = {

    delete: function(req, res){

        async.waterfall([

            /* 로그인한 사람의 요청인지 확인 */
            function (callback) {
                (!auth.isOwner(req, res)) ?
                    res.json({ user: req.user ? req.user : 0 }) :
                    callback(null);
            },

            /* 작성자인지 확인 */
            function (callback) {
                (auth.sameOwner(req, req.body.email) === 0) ?
                    res.json({ user: req.user ? req.user : 0 }) :
                    callback(null);
            },

            /* market 게시글 삭제 수행 */
            function (callback) {
                market_board.findAll({ where: { email: req.body.email } }).then(function (result) {
                    for (let i = 0; i < result.length; i++) {       // 한 게시물에 해당하는 파일을 싹 지우기
                      let id = result[i].id;                        // id는 게시물의 id
                      market_files.findAll({ where: { board_id: id } }).then(function (files) {
                        for (let j = 0; j < files.length; j++) {
                          s3.deleteObject({ Bucket: "uitda.net", Key: files[j].filename }, (err, data) => { if (err) throw err });
                        }
                      }).catch(function (err) { throw err });
                      market_files.destroy({ where: { board_id: id } }).catch(function (err) { throw err });
                      market_board.destroy({ where: { id: id } }).catch(function (err) { throw err });
                    }
                  }).catch(function (err) { throw err });
                callback(null);
            },

            /* networking 게시글 삭제 수행 */
            function (callback) {
                networking_board.findAll({ where: { email: req.body.email } }).then(function (result) {
                    for (let i = 0; i < result.length; i++) {       // 한 게시물에 해당하는 파일을 싹 지우기
                      let id = result[i].id;                        // id는 게시물의 id
                      networking_files.findAll({ where: { board_id: id } }).then(function (files) {
                        for (let j = 0; j < files.length; j++) {
                          s3.deleteObject({ Bucket: "uitda.net", Key: files[j].filename }, (err, data) => { if (err) throw err });
                        }
                      }).catch(function (err) { throw err });
                      networking_files.destroy({ where: { board_id: id } }).catch(function (err) { throw err });
                      networking_board.destroy({ where: { id: id } }).catch(function (err) { throw err });
                    }
                  }).catch(function (err) { throw err });
                callback(null);
            },

            /* carpool 게시글 삭제 수행 */
            function (callback) {
                cal_events.destroy({ where: { email: req.body.email } })
                .then(function (result) { callback(null); })
                .catch(function (err) { throw err });
            },

            /* comment 삭제 수행 */
            function (callback) {
                comment.destroy({ where: { email: req.body.email } })
                .then(function (result) { callback(null); })
                .catch(function (err) { throw err });
            },

            /* logout */
            function (callback) {
                req.logout();
                req.session.save(function () { callback(null) });
            },

            /* users 데이터 삭제 */
            function (callback) {
                users.destroy({ where: { email: req.body.email } })
                .then(function (result) { 
                    res.end();
                    callback(null); 
                })
                .catch(function (err) { throw err });
            }

        ], function (err) {
            if (err) throw (err);
        });

    }

}
