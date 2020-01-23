/* Module load */
let auth = require('./auth');
let async = require('async');
const { market_board } = require('../models');
const { market_files } = require('../models');
const { networking_board } = require('../models');
const { networking_files } = require('../models');
const { comment } = require('../models');
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
function type_board_assign(type) {
    if (type == 'market') {
        return market_board;
    }
    else if (type == 'networking') {
        return networking_board;
    }
}
function type_files_assign(type) {
    if (type == 'market') {
        return market_files;
    }
    else if (type == 'networking') {
        return networking_files;
    }
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
                (req.query.scroll) ?
                    scroll = Number(req.query.scroll) :
                    scroll = 0;
                num_of_data = 12;
                type_board = type_board_assign(type);
                type_files = type_files_assign(type);
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
                        res.json({ postlist: undefined, user: req.user ? req.user : 0, isLast: true });
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
                    let counter = 0;
                    for (let i = 0; i < projects.length; i++) {
                        (function (i) {
                            let content = contents[i];
                            type_files.findAll({ where: { board_id: content.id } }).then(function (files) {
                                console.log(`\nIteration: ${i}\n`);
                                console.log(`\Counter: ${counter}\n`);
                                users.findOne({ where: { username: content.author } }).then(function (user) {
                                    let filelist = [];
                                    if (files.length > 0) {
                                        filelist = make_file(files, files.length);
                                    }
                                    let writer = make_writer(user.username, user.profile_picture, user.pic_location);
                                    let time = moment(content.created, 'YYYY년MM월DD일HH시mm분ss초').fromNow();
                                    (type == 'market') ?
                                        post = make_market_ob(content.id, content.title, writer, time, content.price, content.condition, content.description, filelist) :
                                        post = make_networking_ob(content.id, content.title, writer, time, content.condition, content.description, filelist);
                                    postlist[projects.length - 1 - i] = post;
                                    if ((counter + 1) == projects.length) {
                                        res.json({ postlist: postlist, user: req.user ? req.user : 0, isLast: (scrollEnd) ? true : false });
                                    }
                                    counter++;
                                }).catch(function (err) { throw err; });
                            }).catch(function (err) { throw err; });
                        })(i);
                    }
                }
                /* postlist에 post 없는 경우 */
                else {
                    res.json({ postlist: undefined, user: req.user ? req.user : 0, isLast: true });
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
        let board_id;
        let commentlist;
        let comment_type_board;

        async.waterfall([

            /* 변수 값 할당 */
            function (callback) {
                type_board = type_board_assign(type);
                type_files = type_files_assign(type);
                board_id = req.params.id;
                commentlist = [];
                (type == 'market') ?
                    comment_type_board = 'market':
                    comment_type_board = 'networking';
                callback(null);
            },

            /* commentlist 객체 생성 */
            function (callback) {
                comment.findAll({ where: { board_id: board_id, type_board: comment_type_board } }).then(function(comments){
                    for (let i = 0; i < comments.length; i++) {
                        users.findOne({ where: { username: comments[i].author } }).then(function (user) {
                            let writer = make_writer(user.username, user.profile_picture, user.pic_location);
                            let time = moment(comments[i].created, 'YYYY년MM월DD일HH시mm분ss초').fromNow();
                            comment_ob = make_comment_ob(comments[i].id, comments[i].type_board, comments[i].board_id,
                                comments[i].description, writer, time, comments[i].is_re_comment, comments[i].parent_comment);
                            commentlist[i] = comment_ob;
                        }).catch(function (err) { throw err; });
                    }
                })
                callback(null);
            },

            /* 게시글 정보 검색 */
            function (callback) {
                type_board.findOne({ where: { id: board_id } }).then(function (content) {
                    callback(null, content);
                }).catch(function (err) {
                    throw err;
                });
            },            

            /* post response 객체 생성 & 응답 */
            function (content, callback) {
                type_files.findAll({ where: { board_id: board_id } }).then(function (files) {
                    users.findOne({ where: { username: content.author } }).then(function (user) {
                        let writer = make_writer(user.username, user.profile_picture, user.pic_location);
                        let filelist = make_file(files, files.length);
                        let time = moment(content.created, 'YYYY년MM월DD일HH시mm분ss초').fromNow();
                        let post;
                        (type == 'market') ?
                            post = make_market_ob(content.id, content.title, writer, time, content.price, content.condition, content.description, filelist) :
                            post = make_networking_ob(content.id, content.title, writer, time, content.condition, content.description, filelist);
                        res.json({ post: post, commentlist: commentlist, user: req.user ? req.user : 0 });
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

    /* create 메소드: post 생성 */
    create: function (type, req, res) {

        /* 변수 선언 */
        let type_board; // market_board | networking board
        let type_files; // market_board | networking board
        let title;
        let description;
        let files;

        async.waterfall([

            /* 변수 값 할당 */
            function (callback) {
                title = req.body.title;
                description = req.body.description;
                files = req.files;
                type_board = type_board_assign(type);
                type_files = type_files_assign(type);
                callback(null);
            },

            /* 로그인한 사람의 요청인지 확인 */
            function (callback) {
                (!auth.isOwner(req, res)) ?
                    res.json({ user: req.user ? req.user : 0 }) :
                    callback(null);
            },

            /* 게시글 text data 생성 */
            function (callback) {
                type_board.create({
                    title: title, description: description, author: req.user.username, created: moment().format('YYYY년MM월DD일HH시mm분ss초'), filenum: files.length, count: 0
                }).then(function () {
                    callback(null)
                }).catch(function (err) { throw err; });
            },

            /* 게시글 image data 생성 */
            function (callback) {
                if (files.length) {
                    let board_id = 0;
                    type_board.max('id').then(function (max) { board_id = max; }).then(function () {
                        for (let i = 0; i < files.length; i++) {
                            type_files.create({
                                board_id: board_id, file_id: i, filename: files[i].key, location: files[i].location
                            }).catch(function (err) { throw err; });
                        }
                    }).catch(function (error) { throw error; });
                }
                callback(null);
            },

            /* Redirection */
            function (callback) {
                let id;
                type_board.max('id').then(function (max) { id = max; }).then(function () {
                    type_board.findOne({ where: { id: id } }).then(function (content) {
                        res.json({ post: content, user: req.user ? req.user : 0 });
                    }).catch(function (err) { throw err; });
                });
                callback(null);
            }

        ], function (err) {
            if (err) throw (err);
        });
    },

    /* update 메소드: post 수정 */
    update: function (type, req, res) {

        /* 변수 선언 */
        let type_board; // market_board | networking board
        let type_files; // market_board | networking board
        let title;
        let description;
        let files;
        let id;
        let deleted_files;

        async.waterfall([

            /* 변수 값 할당 */
            function (callback) {
                title = req.body.title;
                description = req.body.description;
                files = req.files;
                id = req.params.id;
                type_board = type_board_assign(type);
                type_files = type_files_assign(type);
                (req.body.deleted_files) ?
                    deleted_files = req.body.deleted_files:
                    deleted_files = [];
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
                type_board.findOne({ where: { id: id } })
                .then(function (content) {
                    (auth.sameOwner(req, content.author) === 0) ?
                        res.json({ user: req.user ? req.user : 0 }) :
                        callback(null);
                })
                .catch(function (err) { throw err; });
            },

            /* 게시글 제목, 내용 수정 */
            function (callback) {
                type_board.update({ title: title, description: description, created: moment().format('YYYY년MM월DD일HH시mm분ss초') }, { where: { id: id } })
                .then(function () { callback(null); })
                .catch(function (err) { throw err; });
            },

            /* 파일 삭제 수행 */
            function (callback) {
                for (let i = 0;  i < deleted_files.length; i++){
                    type_files.findOne({ where: { id: deleted_files[i] } })
                    .then(function (file) {
                        s3.deleteObject(
                            { Bucket: "uitda.net", Key: file.filename },
                            (err, data) => {
                                if (err) throw err;
                                console.log(data);
                            }
                        );
                    })
                    .then(function (){ type_files.destroy({ where: { id: deleted_files[i] } }) })
                    .catch(function (err) { throw err; })
                }
                callback(null);
            },

            /* 파일 추가 수행 */
            function (callback) {
                let max_id = 0;
                if (files.length) {
                    type_files.max('file_id', { where: { board_id : id } })
                    .then(function (max) { if(max) { max_id = max } })
                    .then(function(){
                        for (let i = 0; i < files.length; i++) {
                            type_files.create({ board_id: id, file_id: max_id+1+i , filename: files[i].key, location: files[i].location });
                        }
                    })
                    .catch(function (err) { throw err; })
                }
                callback(null);
            },

            /* filenum 값 수정 */
            // 아직 처리하지 못했습니다.

            /* Redirection */
            function (callback) {
                type_board.findOne({ where: { id: id } })
                .then(function (content) { res.json({ post: content, user: req.user ? req.user : 0 }); })
                .catch(function (err) { throw err; });
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
        let id;

        async.waterfall([

            /* 변수 값 할당 */
            function (callback) {
                id = req.params.id;
                type_board = type_board_assign(type);
                type_files = type_files_assign(type);
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
                type_board.findOne({ where: { id: id } }).then(function (content) {
                    (auth.sameOwner(req, content.author) === 0) ?
                        res.json({ user: req.user ? req.user : 0 }) :
                        callback(null);
                }).catch(function (err) { throw err; });
            },

            /* 게시글 삭제 수행 */
            function (callback) {
                type_board.destroy({ where: { id: id } }).catch(function (err) { throw err; });
                type_files.findAll({ where: { board_id: id } }).then(function (filelist) {
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
                        type_files.destroy({ where: { board_id: id } }).catch(function (err) { throw err; })
                    }
                }).catch(function (err) { throw err; })
                res.redirect(`/api/manage/${type}`);
                callback(null);
            }
        ], function (err) {
            if (err) throw (err);
        });
    }
}