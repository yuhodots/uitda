/* Module load */
var express = require('express');
var router = express.Router();
let user = require('../lib/user');

/* GET users listing. */
router.get('/', function(req, res) {
  res.json({ user: req.user ? req.user : 0 });
});

router.post('/delete', function(req, res) {
  /* req.body.email 정보를 넘겨줘야 함 */
  user.delete(req, res);
});

module.exports = router;