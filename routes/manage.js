/* Module load */
var express = require('express');
var router = express.Router();
var db = require('../config/db');
var auth = require('../lib/auth');

/* AWS SDK, multer-s3 */
var multerS3 = require('../lib/multerS3')();
var upload = multerS3.upload;
var s3 = multerS3.s3;

/* Category: manage page. */
router.get('/', function (req, res, next) {
    if (!auth.isOwner(req, res)) {
        res.render('manage/anonymous', { user: req.user ? req.user : 0 });
    }
    else {
        res.render('manage/home', { user: req.user ? req.user : 0 });
    }
});

/* market-posts */
router.get('/market-posts', function (req, res, next) {
    if (!auth.isOwner(req, res)) {
        res.render('manage/anonymous', { user: req.user ? req.user : 0 });
    }
    else {
        if (auth.hasPost(req, 'market_board') === 0) { // 작성한 게시글이 데이터가 없는 경우
            res.render('manage/market-posts', { postlist: undefined, user: req.user ? req.user : 0 });
        }
        else {
            db.query(
                `SELECT * FROM market_board WHERE author='${req.user.username}'`,
                function (error, results) {
                    if (error) throw error;
                    res.render('manage/market-posts', { postlist: results, user: req.user ? req.user : 0 });
                }
            )
        }
    }
});

router.get('/market-posts/create', function (req, res, next) {
    if (!auth.isOwner(req, res)) {
        res.render('manage/anonymous', { user: req.user ? req.user : 0 });
    }
    else {
        res.render('manage/market-posts_create', { user: req.user ? req.user : 0 });
    }
});

router.post('/market-posts/create', upload.array('userfile', 6), function (req, res, next) {
    if (!auth.isOwner(req, res)) {
        res.render('manage/anonymous', { user: req.user ? req.user : 0 });
    }
    else {
        var title = req.body.title;
        var description = req.body.description;
        var files = req.files;

        db.query(
            `INSERT INTO market_board (title, description, author, created, filenum, count) VALUES(?, ?, '${req.user.username}', NOW(), ${files.length}, 0)`,
            [title, description],
            function (error, result) {
                if (error) throw error;
            }
        )
        for (var i = 0; i < files.length; i++) {
            db.query(
                `INSERT INTO market_files (board_id, file_id, filename, location) VALUES(LAST_INSERT_ID(), ?, ?, ?)`,
                [i, files[i].key, files[i].location],
                function (error, result) {
                    if (error) throw error;
                }
            )
        }
        res.redirect('/api/manage/market-posts');
    }
});

router.get('/market-posts/update/:id', function (req, res, next) {
    if (!auth.isOwner(req, res)) {
        res.render('manage/anonymous', { user: req.user ? req.user : 0 });
    }
    else {
        db.query(
            `SELECT * FROM market_board`,
            function (error, results) {
                if (error) throw error;
                db.query(
                    `SELECT * FROM market_board WHERE id=?`,
                    [req.params.id],
                    function (error2, result) {
                        if (error2) throw error2;
                        else {
                            if (auth.sameOwner(req, result[0].author) === 0) { // 다른 사용자의 잘못된 접근
                                res.render('cheat', { user: req.user ? req.user : 0 });
                            }
                            else { // 올바른 사용자의 접근
                                res.render('manage/market-posts_update', { post: result[0], user: req.user ? req.user : 0 });
                            }
                        }
                    }
                )
            }
        )
    }
});

router.post(`/market-posts/update/:id`, function (req, res, next) {
    if (!auth.isOwner(req, res)) {
        res.render('manage/anonymous', { user: req.user ? req.user : 0 });
    }
    else {
        // 아직 파일 수정 구현은 하지 않았습니다.

        var title = req.body.title;
        var description = req.body.description;
        var id = req.body.id;
        db.query(
            `SELECT * FROM market_board WHERE id=?`,
            [id],
            function (error, result) {
                if (error) throw error;
                else {
                    if (auth.sameOwner(req, result[0].author) === 0) { // 다른 사용자의 잘못된 접근
                        res.render('cheat', { user: req.user ? req.user : 0 });
                    }
                    else { // 올바른 사용자의 접근
                        db.query(
                            'UPDATE market_board SET title=?, description=? WHERE id=?',
                            [title, description, id],
                            function (error2, result) {
                                if (error2) throw error2;
                                res.redirect(`/api/market/${id}`);
                            }
                        )
                    }
                }
            }
        )
    }
});

/* networking-posts */
router.get('/networking-posts', function (req, res, next) {
    if (!auth.isOwner(req, res)) {
        res.render('manage/anonymous', { user: req.user ? req.user : 0 });
    }
    else {
        if (auth.hasPost(req, 'networking_board') === 0) { // 작성한 게시글이 데이터가 없는 경우
            res.render('manage/networking-posts', { postlist: undefined, user: req.user ? req.user : 0 });
        }
        else {
            db.query(
                `SELECT * FROM networking_board WHERE author='${req.user.username}'`,
                function (error, results) {
                    if (error) throw error;
                    res.render('manage/networking-posts', { postlist: results, user: req.user ? req.user : 0 });
                }
            )
        }
    }
});

router.get('/networking-posts/create', function (req, res, next) {
    if (!auth.isOwner(req, res)) {
        res.render('manage/anonymous', { user: req.user ? req.user : 0 });
    }
    else {
        res.render('manage/networking-posts_create', { user: req.user ? req.user : 0 });
    }
});

router.post('/networking-posts/create', upload.array('userfile', 6), function (req, res, next) {
    if (!auth.isOwner(req, res)) {
        res.render('manage/anonymous', { user: req.user ? req.user : 0 });
    }
    else {
        var title = req.body.title;
        var description = req.body.description;
        var files = req.files;

        db.query(
            `INSERT INTO networking_board (title, description, author, created, filenum, count) VALUES(?, ?, '${req.user.username}', NOW(), ${files.length}, 0)`,
            [title, description],
            function (error, result) {
                if (error) throw error;
            }
        )
        for (var i = 0; i < files.length; i++) {
            db.query(
                `INSERT INTO networking_files (board_id, file_id, filename, location) VALUES(LAST_INSERT_ID(), ?, ?, ?)`,
                [i, files[i].key, files[i].location],
                function (error, result) {
                    if (error) throw error;
                }
            )
        }
        res.redirect('/api/manage/networking-posts');
    }
});

router.get('/networking-posts/update/:id', function (req, res, next) {
    if (!auth.isOwner(req, res)) {
        res.render('manage/anonymous', { user: req.user ? req.user : 0 });
    }
    else {
        db.query(
            `SELECT * FROM networking_board`,
            function (error, results) {
                if (error) throw error;
                db.query(
                    `SELECT * FROM networking_board WHERE id=?`,
                    [req.params.id],
                    function (error2, result) {
                        if (error2) throw error2;
                        else {
                            if (auth.sameOwner(req, result[0].author) === 0) { // 다른 사용자의 잘못된 접근
                                res.render('cheat', { user: req.user ? req.user : 0 });
                            }
                            else { // 올바른 사용자의 접근
                                res.render('manage/networking-posts_update', { post: result[0], user: req.user ? req.user : 0 });
                            }
                        }
                    }
                )
            }
        )
    }
});

router.post(`/networking-posts/update/:id`, function (req, res, next) {
    if (!auth.isOwner(req, res)) {
        res.render('manage/anonymous', { user: req.user ? req.user : 0 });
    }
    else {
        // 아직 파일 수정 구현은 하지 않았습니다.

        var title = req.body.title;
        var description = req.body.description;
        var id = req.body.id;
        db.query(
            `SELECT * FROM networking_board WHERE id=?`,
            [id],
            function (error, result) {
                if (error) throw error;
                else {
                    if (auth.sameOwner(req, result[0].author) === 0) { // 다른 사용자의 잘못된 접근
                        res.render('cheat', { user: req.user ? req.user : 0 });
                    }
                    else { // 올바른 사용자의 접근
                        db.query(
                            'UPDATE networking_board SET title=?, description=? WHERE id=?',
                            [title, description, id],
                            function (error2, result) {
                                if (error2) throw error2;
                                res.redirect(`/api/networking/${id}`);
                            }
                        )
                    }
                }
            }
        )
    }
});

/* carpool-posts */
router.get('/carpool-posts', function (req, res, next) {
    if (!auth.isOwner(req, res)) {
        res.render('manage/anonymous', { user: req.user ? req.user : 0 });
    }
    else {
        if (auth.hasPost_carpool(req, 'cal_events') === 0) { // 작성한 게시글이 데이터가 없는 경우
            res.render('manage/carpool-posts', { postlist: undefined, user: req.user ? req.user : 0 });
        }
        else {
            db.query(
                `SELECT * FROM cal_events WHERE username='${req.user.username}'`,
                function (error, results) {
                    if (error) throw error;
                    res.render('manage/carpool-posts', { postlist: results, user: req.user ? req.user : 0 });
                }
            )
        }
    }
});

router.get('/carpool-posts/create', function (req, res, next) {
    if (!auth.isOwner(req, res)) {
        res.render('manage/anonymous', { user: req.user ? req.user : 0 });
    }
    else {
        res.render('manage/carpool-posts_create', { user: req.user ? req.user : 0 });
    }
});

router.post('/carpool-posts/create', function (req, res, next) {
    if (!auth.isOwner(req, res)) {
        res.render('manage/anonymous', { user: req.user ? req.user : 0 });
    }
    else {
        if (!auth.isOwner(req, res)) {
            res.render('manage/anonymous', { user: req.user ? req.user : 0 });
        }
        else {
            var title = req.body.origin + '->' + req.body.destination;
            var start = '2019-' + req.body.month + '-' + req.body.day + 'T' + req.body.hour + ':' + req.body.min + ':00';
            var description = req.body.description;
            db.query(
                `INSERT INTO cal_events (title, description, username, start) VALUES(?, ?, '${req.user.username}', ?)`,
                [title, description, start],
                function (error, result) {
                    if (error) throw error;
                    res.redirect('/api/manage/carpool-posts');
                }
            )
        }
    }
});

router.get('/carpool-posts/update/:id', function (req, res, next) {
    if (!auth.isOwner(req, res)) {
        res.render('manage/anonymous', { user: req.user ? req.user : 0 });
    }
    else {
        db.query(
            `SELECT * FROM cal_events`,
            function (error, results) {
                if (error) throw error;
                db.query(
                    `SELECT * FROM cal_events WHERE id=?`,
                    [req.params.id],
                    function (error2, result) {
                        if (error2) throw error2;
                        else {
                            if (auth.sameOwner_carpool(req, result[0].username) === 0) { // 다른 사용자의 잘못된 접근
                                res.render('cheat', { user: req.user ? req.user : 0 });
                            }
                            else { // 올바른 사용자의 접근
                                res.render('manage/carpool-posts_update', { post: result[0], user: req.user ? req.user : 0 });
                            }
                        }
                    }
                )
            }
        )
    }
});

router.post(`/carpool-posts/update/:id`, function (req, res, next) {
    if (!auth.isOwner(req, res)) {
        res.render('manage/anonymous', { user: req.user ? req.user : 0 });
    }
    else {
        var title = req.body.origin + '->' + req.body.destination;
        var start = '2019-' + req.body.month + '-' + req.body.day + 'T' + req.body.hour + ':' + req.body.min + ':00';
        var description = req.body.description;
        var id = req.body.id;
        db.query(
            `SELECT * FROM cal_events WHERE id=?`,
            [id],
            function (error, result) {
                if (error) throw error;
                else {
                    if (auth.sameOwner_carpool(req, result[0].username) === 0) { // 다른 사용자의 잘못된 접근
                        res.render('cheat', { user: req.user ? req.user : 0 });
                    }
                    else { // 올바른 사용자의 접근
                        db.query(
                            'UPDATE cal_events SET title=?, start=?, description=? WHERE id=?',
                            [title, start, description, id],
                            function (error2, result) {
                                if (error2) throw error2;
                                res.redirect(`/api/carpool`);
                            }
                        )
                    }
                }
            }
        )
    }
});

/* proposal */
router.get('/proposal', function (req, res, next) {
    if (!auth.isOwner(req, res)) {
        res.render('manage/anonymous', { user: req.user ? req.user : 0 });
    }
    else {
        res.render('manage/proposal', { user: req.user ? req.user : 0 });
    }
});

router.get('/proposal/create', function (req, res, next) {
    if (!auth.isOwner(req, res)) {
        res.render('manage/anonymous', { user: req.user ? req.user : 0 });
    }
    else {
        res.render('manage/proposal_create', { user: req.user ? req.user : 0 });
    }
});

router.post('/proposal/create', function (req, res, next) {
    if (!auth.isOwner(req, res)) {
        res.render('manage/anonymous', { user: req.user ? req.user : 0 });
    }
    else {
        var title = req.body.title;
        var description = req.body.description;
        db.query(
            `INSERT INTO proposal (title, description, author, created) VALUES(?, ?, '${req.user.username}', NOW())`,
            [title, description],
            function (error, result) {
                if (error) throw error;
            }
        )
        res.redirect('/api/manage/proposal');
    }
});

/* account */
router.get('/account', function (req, res, next) {
    if (!auth.isOwner(req, res)) {
        res.render('manage/anonymous', { user: req.user ? req.user : 0 });
    }
    else {
        res.render('manage/account', { user: req.user ? req.user : 0 });
    }
});

router.get('/account/data', function (req, res, next) {
    if (!auth.isOwner(req, res)) {
        res.render('manage/anonymous', { user: req.user ? req.user : 0 });
    }
    else {
        res.render('manage/account_data', { user: req.user ? req.user : 0 });
    }
});

router.post('/account/data', function (req, res, next) {
    if (!auth.isOwner(req, res)) {
        res.render('manage/anonymous', { user: req.user ? req.user : 0 });
    }
    else {
        /* 1. Deletion of market posts */
        var firstfunc = function (foo2) {
            db.query(
                `SELECT * FROM market_board WHERE author=?`,
                [req.body.username],
                function (error, result) {
                    if (error) throw error;
                    for (var i = 0; i < result.length; i++) {
                        var id = result[i].id;

                        db.query(
                            `SELECT * FROM market_files WHERE board_id=?`,
                            [id],
                            function (error, files) {
                                if (error) throw error;
                                for (var j = 0; j < files.length; j++) {
                                    s3.deleteObject(
                                        {
                                            Bucket: "uitda.net",
                                            Key: files[j].filename
                                        },
                                        (err, data) => {
                                            if (err) throw err;
                                            console.log(data);
                                        }
                                    );
                                }
                            }
                        );
                        db.query(
                            'DELETE FROM market_files WHERE board_id = ?',
                            [id],
                            function (error,result) {
                                if (error) throw error;
                                db.query(
                                    'DELETE FROM market_board WHERE id = ?',
                                    [id],
                                    function (error,result) {
                                        if (error) throw error;
                                        foo2;
                                    }
                                );
                            }
                        );

                    }
                }
            );
        };
        /* 2. Deletion of networking posts */
        var secondfunc = function (foo3) {
            db.query(
                `SELECT * FROM networking_board WHERE author=?`,
                [req.body.username],
                function (error, result) {
                    if (error) throw error;
                    for (var i = 0; i < result.length; i++) {
                        var id = result[i].id;

                        db.query(
                            `SELECT * FROM networking_files WHERE board_id=?`,
                            [id],
                            function (error, files) {
                                if (error) throw error;
                                for (var j = 0; j < files.length; j++) {
                                    s3.deleteObject(
                                        {
                                            Bucket: "uitda.net",
                                            Key: files[j].filename
                                        },
                                        (err, data) => {
                                            if (err) throw err;
                                            console.log(data);
                                        }
                                    );
                                }
                            }
                        );
                        db.query(
                            'DELETE FROM networking_files WHERE board_id = ?',
                            [id],
                            function (error,result) {
                                if (error) throw error;
                                db.query(
                                    'DELETE FROM networking_board WHERE id = ?',
                                    [id],
                                    function (error,result) {
                                        if (error) throw error;
                                        foo3;
                                    }
                                );
                            }
                        );

                    }
                }
            );
        };
        /* 3. Logout */
        var thirdfunc = function (foo4) {
            req.logout();
            req.session.save(function () {
                foo4;
            });
        };
        /* 4. Deletion of user data */
        var forthfunc = function () {
            db.query(
                'DELETE FROM users WHERE username = ?',
                [req.body.username],
                function (error) {
                    if (error) throw error;
                }
            );
        };
        /* 5. Main part */
        if (auth.sameOwner(req, req.body.username) === 0) {
            res.render('cheat', { user: req.user ? req.user : 0 });
        }
        else {
            firstfunc(secondfunc(thirdfunc(forthfunc())));
            res.redirect('/api/');
        }
    }

});

module.exports = router;