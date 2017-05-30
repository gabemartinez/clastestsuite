var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

var websparkcheck = require('../middleware/websparkcheck');

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/* GET testrunner page. */
router.get('/', function(req, res, next) {
  res.render('../views/pages/testrunner');
});

router.post('/', urlencodedParser, websparkcheck, function(req, res, next) {
  var site = req.body.site;
  res.render('../views/pages/testrunner-started', { site });
});

router.get('/notwebspark', function(req, res, next) {
  var site = req.body.site;
  res.render('../views/pages/notwebspark', { site: site });
});




router.get('/allreports', function(req, res, next) {
  // res.json('all reports');
  res.render('../views/pages/allreports');
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
