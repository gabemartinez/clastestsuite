var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/* GET testrunner page. */
router.get('/', function(req, res, next) {
  res.render('../views/pages/testrunner');
});

router.post('/', urlencodedParser, function(req, res, next) {
  var site = req.body.site;
  res.render('../views/pages/testrunner-started', { site });
});




router.get('/allreports', function(req, res, next) {
  res.json('all reports');
});

router.get('/report/:reportid', function(req, res, next) {
  var reportid = req.params.reportid;
  res.json({reportid});
});

router.get('/report/:reportid/:testid', function(req, res, next) {
  var reportid = req.params.reportid;
  var testid = req.params.testid;
  res.json({reportid, testid});
});

module.exports = router;
