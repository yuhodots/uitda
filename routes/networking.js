/* Module load */
var express = require('express');
var router = express.Router();
var auth = require('../lib/auth');
const { networking_board } = require('../models');
const { networking_files } = require('../models');

/* AWS SDK, multer-s3 */
var multerS3 = require('../lib/multerS3')();
var s3 = multerS3.s3;

/* Category: networking page. */
router.get('/', function (req, res, next) {
      networking_board.findAll().then(function(projects){
        res.render('networking/home', { postlist: projects, user: req.user ? req.user : 0 });
      }).catch(function(err){throw err;});
});

router.get('/:id', function (req, res, next) {
  networking_board.findOne({where : {id : req.params.id}}).then(function(content){
    networking_files.findAll({where : {board_id : req.params.id}}).then(function(files){
        console.log(files);
      res.render('networking/post', { post: content, files: files, user: req.user ? req.user : 0 });
    }).catch(function(err){
      throw err;
    });
  }).catch(function(err){
    throw err;
  });
});

router.post('/delete', function (req, res, next) {
  if (!auth.isOwner(req, res)) {
      res.render('networking/anonymous', { user: req.user ? req.user : 0 });
  }
  else {
    networking_board.destroy({where : {id:req.body.id}}).catch(function(err){throw err;});
    networking_files.findAll({where :{board_id:req.body.id}}).then(function(content){
      if(content.length){
        for (var i = 0; i < content.length; i++) {
            s3.deleteObject(
                {
                    Bucket: "uitda.net",
                    Key: content[i].filename
                },
                (err, data) => {
                    if (err) throw err;
                    console.log(data);
                }
            );
        }
        networking_files.destroy({where:{board_id:req.body.id}}).catch(function(err){throw err;})
      }
    }).catch(function(err){throw err;})
    res.redirect('/api/manage/networking-posts');
  }
});

module.exports = router;
