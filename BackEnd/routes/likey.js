/* Module load */
let express = require('express');
let router = express.Router();
let likey = require('../lib/likey');

router.get('/',function(req, res){
  likey.my_likey(req, res);
});

router.get('/:id', function (req, res) {
    likey.likey(req, res);
});


module.exports = router;
