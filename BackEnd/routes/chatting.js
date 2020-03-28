/* Module load */
let express = require('express');
let router = express.Router();
let chatting = require('../lib/chatting');

/* Category: chatting page. */
router.get('/', function (req, res) {
  chatting.main(req,res);
});

router.get('/room/:id',function(req, res){
  chatting.room(req, res);
})

module.exports = router;
