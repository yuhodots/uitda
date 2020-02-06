/* Module load */
let express = require('express');
let router = express.Router();
let carpool = require('../lib/carpool');

/* Category: carpool page. */
router.get('/', function (req, res) {
  carpool.eventlist(req, res);
});

router.post('/create', function (req, res) {
  /* 요청으로 보내줘야 하는 값: title, departure, destination, start, meeting_place, contact, account, description */
  carpool.create(req, res);
});

router.post(`/update/:id`, function (req, res) {
  /* 요청으로 보내줘야 하는 값: title, departure, destination, start, meeting_place, contact, account, description */
  carpool.update(req, res);
});

router.post('/delete/:id', function (req, res) {
  carpool.delete(req, res);
});

module.exports = router;