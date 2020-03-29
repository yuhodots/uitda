/* Module load */
var express = require('express');
var router = express.Router();
let user = require('../lib/user');

/* AWS SDK, multer-s3 */
let multerS3 = require('../lib/multerS3')();
let upload = multerS3.upload;

/* User checking */
/* 로그인 하지 않은 유저의 요청을 home으로 리다이렉트 */
let usercheck = function (req, res, next) {
  (req.user)? next(): res.redirect('/');
};

router.get('/', function(req, res) {
  res.json({ user: req.user ? req.user : 0 });
});

router.post('/update', [ usercheck, upload.single('userfile') ], function(req, res) {
  user.update(req, res);
});

router.post('/delete', function(req, res) {
  /* req.body.email 정보를 넘겨줘야 함 */
  user.delete(req, res);
});

module.exports = router;