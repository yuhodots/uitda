/* Module load */
let express = require('express');
let router = express.Router();
let chatting = require('../lib/chatting');

/* Category: chatting page. */
router.get('/', function (req, res) {
  chatting.main(req,res);
});

router.get('/user/:user_id', function (req, res) {//채팅방 찾기
  chatting.find_user(req,res);
});

router.get('/room/:id',function(req, res){//채팅방
  chatting.room(req, res);
})

module.exports = router;
