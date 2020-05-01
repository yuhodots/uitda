/* Module load */
let express = require('express');
let router = express.Router();
let chatting = require('../lib/chatting');

/* AWS SDK, multer-s3 */
let multerS3 = require('../lib/multerS3')();
let upload = multerS3.upload;

/* User checking */
/* 로그인 하지 않은 유저의 요청을 home으로 리다이렉트 */
let usercheck = function (req, res, next) {
  (req.user)? next(): res.redirect('/');
};

/* Category: chatting page. */

router.get('/user/:user_id', function (req, res) {//채팅방 찾기
  chatting.find_user(req,res);
});

router.get('/room/:id',function(req, res){//채팅방
  chatting.room(req, res);
})

router.get('/image/create', function (req, res) {
  res.json({ user: req.user ? req.user : 0 });
});

router.post('/image/create',  upload.array('userfile', 6) , function (req, res) {
  chatting.image_create(req, res);
});


module.exports = router;
