/* Module load */
var express = require('express');
var router = express.Router();
var db = require('../config/db');
var auth = require('../lib/auth');

/* AWS SDK, multer-s3 */
var multerS3 = require('../lib/multerS3')();
var s3 = multerS3.s3;

/* Category: market page. */
router.get('/', function (req, res, next) {
    db.query(
        `SELECT * FROM market_board`,
        function (error, results) {
            if (error) throw error;
            res.render('market/home', { postlist: results, user: req.user ? req.user : 0 });
        }
    )
});

router.get('/:id', function (req, res, next) {
    db.query(
        `SELECT * FROM market_board`,
        function (error, results) {
            if (error) throw error;
            db.query(
                `SELECT * FROM market_board WHERE id=?`,
                [req.params.id],
                function (error2, result) {
                    if (error2) throw error2;
                    db.query(
                        `SELECT * FROM market_files WHERE board_id=?`,
                        [req.params.id],
                        function (error3, files) {
                            if (error3) throw error3;
                            res.render('market/post', { post: result[0], files: files, user: req.user ? req.user : 0 });
                        });
                })
        }
    );
});

router.post('/delete', function (req, res, next) {
    if (!auth.isOwner(req, res)) {
        res.render('manage/anonymous', { user: req.user ? req.user : 0 });
    }
    else {
        db.query(
            `SELECT * FROM market_board WHERE id=?`,
            [req.body.id],
            function (error, result) {
                if (error) throw error;
                if (auth.sameOwner(req, result[0].author) === 0) { // 다른 사용자의 잘못된 접근
                    res.render('cheat', { user: req.user ? req.user : 0 });
                }
                else {
                    db.query(
                        `SELECT * FROM market_files WHERE board_id=?`,
                        [req.body.id],
                        function (error, files) {
                            if (error) throw error;
                            for (var i = 0; i < files.length; i++) {
                                s3.deleteObject(
                                    {
                                        Bucket: "uitda.net",
                                        Key: files[i].filename
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
                        [req.body.id],
                        function (error, result) {
                            if (error) throw error;
                            db.query(
                                'DELETE FROM market_board WHERE id = ?',
                                [req.body.id],
                                function (error, result) {
                                    if (error) throw error;
                                    res.redirect('/api/manage/market-posts');
                                }
                            );
                        }
                    );
                }
            }
        );
    }
});

module.exports = router;