/* Module load */
let express = require('express');
let router = express.Router();
let carpool = require('../lib/carpool');

/* Carpool: events */
router.get('/', function (req, res) {
  carpool.eventlist(req, res);
});

router.post('/create', function (req, res) {
  /* 요청으로 보내줘야 하는 값: departure, destination, start, meeting_place, contact, description, condition */
  carpool.create(req, res);
});

router.post(`/update/:id`, function (req, res) {
  /* 요청으로 보내줘야 하는 값: departure, destination, start, meeting_place, contact, description, condition */
  carpool.update(req, res);
});

router.post('/delete/:id', function (req, res) {
  carpool.delete(req, res);
});

/* Carpool: guests */
router.post('/guest/create/:event_id', function (req, res) {
  carpool.guest_create(req, res);
});

// router.post('/guest/update/:id', function (req, res) {
  /* 요청으로 보내줘야 하는 값: condition */
//   carpool.guest_update(req, res);
// });

router.post('/guest/delete/:event_id', function (req, res) {
  carpool.guest_delete(req, res);
});

/* Carpool: guestlist */
router.get('/guestlist/:id', function (req, res) {
  carpool.guestlist(req, res);
});

module.exports = router;