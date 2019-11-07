/* Module load */
let auth = require('./auth');
let async = require('async');
const { market_board } = require('../models');
const { market_files } = require('../models');
const { networking_board } = require('../models');
const { networking_files } = require('../models');
const { users } = require('../models');
const sequelize = require("sequelize");
const Op = sequelize.Op;
let moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");
moment.locale('ko');

/* AWS SDK, multer-s3 */
let multerS3 = require('../lib/multerS3')();
let s3 = multerS3.s3;

/* Model method */
function make_writer(username, profile_picture, pic_location) {
    let writer = {
        username: username,
        profile_picture: profile_picture,
        pic_location: pic_location
    }
    return writer;
}
function make_file(files, num) {
    let file = [];
    for (i = 0; i < num; i++) {
        file.push(files[i].dataValues);
    }
    return file;
}
function make_market_ob(id, title, user, created, price, condition, description, filelist) {
    let post = {
        id: id,
        title: title,
        user: user,
        created: created,
        price: price,
        condition: condition,
        description: description,
        filelist: filelist
    }
    return post;
}
function make_networking_ob(id, title, user, created, condition, description, filelist) {
    let post = {
        id: id,
        title: title,
        user: user,
        created: created,
        condition: condition,
        description: description,
        filelist: filelist
    }
    return post;
}

/* Board method */
module.exports = {

    /* postlist 메소드: board에 대한 postlist 객체를 리턴 */
    postlist: function (type, req, res) {

        /* 변수 선언 */
        let q;              // 프론트엔드에서 전달된 q 쿼리 값
        let scroll;         // 프론트엔드에서 전달된 scroll 쿼리 값
        let num_of_data;    // postlist에 담을 post 개수
        let type_board;     // market_board | networking board
        let type_files;     // market_board | networking board
        let where;          // DB 정보 찾는 범위
        let scrollEnd;      // scroll이 끝에 도달했는지 알려주는 값

        async.waterfall([

            /* 변수 값 할당 */
            function (callback) {
                q = req.query.q;
                scroll = Number(req.query.scroll);
                num_of_data = 6;
                if (type == 'market') {
                    type_board = market_board;
                    type_files = market_files;
                }
                else if (type == 'networking') {
                    type_board = networking_board;
                    type_files = networking_files;
                }
                callback(null);
            },

            /* where 변수 값 할당 */
            function (callback) {
                (q) ?
                    where = {
                        [Op.or]: [
                            { description: { [Op.like]: "%" + q + "%" } },  // description에서 검색
                            { title: { [Op.like]: "%" + q + "%" } }         // title에서 검색
                        ]
                    } : where = {};                                         // 검색어 제한 없음
                callback(null);
            },

            /* post 전체 개수를 count에 할당 */
            function (callback) {
                type_board.count({
                    where: where,
                }).then(function (count) { callback(null, count) });
            },

            /* post가 얼마나 response 되었는지 확인 */
            function (count, callback) {
                {
                    /* 모든 post가 이미 response 된 경우 */
                    if (count < num_of_data * scroll) {
                        res.render('market/home', { postlist: undefined, user: req.user ? req.user : 0, isLast: true });
                    }
                    /* 아직 response 되지 않은 post가 남은 경우 */
                    scrollEnd = (count < num_of_data * scroll + num_of_data) ? 1 : 0;
                    type_board.findAndCountAll({
                        where: where,
                        offset: (scrollEnd) ? 0 : count - num_of_data * (scroll + 1),
                        limit: (scrollEnd) ? count % num_of_data : num_of_data
                    }).then(function (projects) {
                        callback(null, projects);
                    }).catch(function (err) { throw err; });
                }
            },

            /* fincAndCountAll 메소드는 객체 정보를 count, row 키로 보내기 때문에 아래줄과 같이 수정해 줘야함 */
            function (projects, callback) {
                projects = projects["rows"];
                callback(null, projects);
            },

            /* postlist response 객체 생성 & 응답 */
            function (projects, callback) {
                /* postlist에 post 있는 경우 */
                if (projects.length) {
                    let contents = make_file(projects, projects.length);
                    let postlist = [];
                    for (let i = 0; i < projects.length; i++) {
                        (function (i) {
                            let content = contents[i];
                            type_files.findAll({ where: { board_id: content.id } }).then(function (files) {
                                users.findOne({ where: { username: content.author } }).then(function (user) {
                                    let filelist = [];
                                    if (files.length > 0) {
                                        filelist = make_file(files, files.length);
                                    }
                                    let writer = make_writer(user.username, user.profile_picture, user.pic_location);
                                    let time = moment(content.created, 'YYYY년MM월DD일HH시mm분ss초').fromNow();
                                    let post;
                                    (type == 'market') ?
                                        post = make_market_ob(content.id, content.title, writer, time, content.price, content.condition, content.description, filelist) :
                                        post = make_networking_ob(content.id, content.title, writer, time, content.condition, content.description, filelist);
                                    postlist[i] = post;
                                    if ((i + 1) === projects.length) {
                                        res.render('market/home', { postlist: postlist, user: req.user ? req.user : 0, isLast: (scrollEnd) ? true : false });
                                    }
                                }).catch(function (err) { throw err; });
                            }).catch(function (err) { throw err; });
                        })(i);
                    }
                }
                /* postlist에 post 없는 경우 */
                else {
                    res.render('market/home', { postlist: undefined, user: req.user ? req.user : 0, isLast: true });
                }
                callback(null);
            }
        ], function (err) {
            if (err) throw (err);
        });
    },

    /* post 메소드: post 객체를 리턴 */
    post: function (type, req, res) {

        /* 변수 선언 */
        let type_board; // market_board | networking board
        let type_files; // market_board | networking board

        async.waterfall([

            /* 변수 값 할당 */
            function (callback) {
                if (type == 'market') {
                    type_board = market_board;
                    type_files = market_files;
                }
                else if (type == 'networking') {
                    type_board = networking_board;
                    type_files = networking_files;
                }
                callback(null);
            },

            /* 게시글 정보 검색 */
            function (callback) {
                type_board.findOne({ where: { id: req.params.id } }).then(function (content) {
                    callback(null, content);
                }).catch(function (err) {
                    throw err;
                });
            },

            /* post response 객체 생성 & 응답 */
            function (content, callback) {
                type_files.findAll({ where: { board_id: req.params.id } }).then(function (files) {
                    users.findOne({ where: { username: content.author } }).then(function (user) {
                        let writer = make_writer(user.username, user.profile_picture, user.pic_location);
                        let filelist = make_file(files, files.length);
                        let time = moment(content.created, 'YYYY년MM월DD일HH시mm분ss초').fromNow();
                        let post;
                        (type == 'market') ?
                            post = make_market_ob(content.id, content.title, writer, time, content.price, content.condition, content.description, filelist) :
                            post = make_networking_ob(content.id, content.title, writer, time, content.condition, content.description, filelist);
                        res.render('market/post', { post: post, user: req.user ? req.user : 0 });
                    }).catch(function (err) { throw err; })
                }).catch(function (err) {
                    throw err;
                });
                callback(null);
            }
        ], function (err) {
            if (err) throw (err);
        });
    },

    /* delete 메소드: post 삭제요청을 수행 */
    delete: function (type, req, res) {

        /* 변수 선언 */
        let type_board; // market_board | networking board
        let type_files; // market_board | networking board

        async.waterfall([

            /* 변수 값 할당 */
            function (callback) {
                if (type == 'market') {
                    type_board = market_board;
                    type_files = market_files;
                }
                else if (type == 'networking') {
                    type_board = networking_board;
                    type_files = networking_files;
                }
                callback(null);
            },

            /* 로그인한 사람의 요청인지 확인 */
            function (callback) {
                if (!auth.isOwner(req, res)) {
                    res.render('manage/anonymous', { user: req.user ? req.user : 0 });
                }
                callback(null);
            },

            /* 게시글 정보 검색 */
            function (callback) {
                type_board.findOne({ where: { id: req.body.id } }).then(function (content) {
                    callback(null, content);
                }).catch(function (err) { throw err; });
            },

            /* 게시글 삭제 수행 */
            function (content, callback) {
                /* 다른 사용자의 잘못된 접근 */
                if (auth.sameOwner(req, content.author) === 0) {
                    res.render('manage/anonymous', { user: req.user ? req.user : 0 });
                }
                /* 올바른 사용자의 접근 */
                else {
                    type_board.destroy({ where: { id: req.body.id } }).catch(function (err) { throw err; });
                    type_files.findAll({ where: { board_id: req.body.id } }).then(function (filelist) {
                        if (filelist.length) {
                            for (let i = 0; i < filelist.length; i++) {
                                s3.deleteObject(
                                    { Bucket: "uitda.net", Key: filelist[i].filename },
                                    (err, data) => {
                                        if (err) throw err;
                                        console.log(data);
                                    }
                                );
                            }
                            type_files.destroy({ where: { board_id: req.body.id } }).catch(function (err) { throw err; })
                        }
                    }).catch(function (err) { throw err; })
                    res.redirect(`/view/manage/${type}-posts`);
                }
                callback(null);
            }
        ], function (err) {
            if (err) throw (err);
        });
    }
}