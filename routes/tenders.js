var express = require('express');
var router = express.Router();
var tendersController = require('../controllers/TenderController');

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

module.exports = router;