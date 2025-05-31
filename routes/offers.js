var express = require('express');
var router = express.Router();
var offerController = require('../controllers/OfferController');

/* GET  offer by id */
// router.get('/:id', function(req, res, next) {
//   offerController.findByTenderId(req, res, next);
// });
/* DELETE all offers */
router.delete('/', function(req, res, next) {
  offerController.deleteAll(req, res, next);
});

module.exports = router;