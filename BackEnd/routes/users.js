/* Module load */
var express = require('express');
var router = express.Router();
let user = require('../lib/user');

/* AWS SDK, multer-s3 */
let multerS3 = require('../lib/multerS3')();
let upload = multerS3.upload;

/* User checking */
let usercheck = function (req, res, next) {
  (req.user)? next(): res.redirect('http://localhost:4000/');
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