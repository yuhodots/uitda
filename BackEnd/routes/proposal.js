/* Module load */
let express = require('express');
let router = express.Router();
let proposal = require('../lib/proposal');

router.get('/',function(req, res){
  proposal.my_proposal(req, res);
});

router.get('/:id', function (req, res) {
    proposal.proposal(req, res);
});

router.post('/create', function (req, res) {
    proposal.create(req, res);
});

router.post('/update/:id', function (req, res) {
    proposal.update(req, res);
  });

router.post('/delete/:id', function (req, res) {
    proposal.delete(req, res);
});

module.exports = router;
