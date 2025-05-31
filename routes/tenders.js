var express = require('express');
var router = express.Router();
var tendersController = require('../controllers/TenderController');
var offerController = require('../controllers/OfferController');

/* GET current tenders. */
router.get('/', function(req, res, next) {
  tendersController.listActive(req, res, next);
});
/* GET past tenders. */
router.get('/past', function(req, res, next) {
  tendersController.listPast(req, res, next);
});
/* GET new tender. */
router.get('/new', function(req, res, next) {
  res.render('newTender');
});
/* POST new tender. */
router.post('/new', function(req, res, next) {
  tendersController.create(req, res, next);
});
/* GET tender by ID. */
router.get('/:id', function(req, res, next) {
  tendersController.findById(req, res, next);
});
/* GET offers by tender ID. */
router.get('/:id/offers', function(req, res, next) {
  offerController.findByTenderId(req, res, next);
});
/* POST offer by tender ID. */
router.post('/:id/offers', function(req, res, next) {
  tendersController.addOfferByTenderId(req, res, next);
});
/* DELETE all tenders */
router.delete('/', function(req, res, next) {
  tendersController.deleteAll(req, res, next);
});


module.exports = router;