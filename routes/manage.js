/* Module load */
var express = require('express');
var router = express.Router();
var db = require('../config/db');
var auth = require('../lib/auth');

/* AWS SDK, multer-s3 */
var multerS3 = require('../lib/multerS3')();
var upload = multerS3.upload;

/* Category: manage page. */
router.get('/', function (req, res, next) {
    if (!auth.isOwner(req, res)) {
        res.render('manage/anonymous', { user: req.user ? req.user : 0 });
    }
    else {
        res.render('manage/home', { user: req.user ? req.user : 0 });
    }
});

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
        res.redirect('/manage/market-posts');
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
                                res.redirect(`/market/${id}`);
                            }
                        )
                    }
                }
            }
        )
    }
});

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
        res.redirect('/manage/networking-posts');
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
                                res.redirect(`/networking/${id}`);
                            }
                        )
                    }
                }
            }
        )
    }
});

router.get('/carpool-posts', function (req, res, next) {
    if (!auth.isOwner(req, res)) {
        res.render('manage/anonymous', { user: req.user ? req.user : 0 });
    }
    else {
        res.render('manage/carpool-posts', { user: req.user ? req.user : 0 });
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
        //아직 처리하지 않았습니다.
        res.redirect('/manage/carpool-posts');
    }
});

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
        //아직 처리하지 않았습니다.
        res.redirect('/manage/proposal');
    }
});

router.get('/leave', function (req, res, next) {
    if (!auth.isOwner(req, res)) {
        res.render('manage/anonymous', { user: req.user ? req.user : 0 });
    }
    else {
        res.render('manage/leave', { user: req.user ? req.user : 0 });
    }
});

module.exports = router;