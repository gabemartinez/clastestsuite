var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

var fs = require('fs');

// var rmdir = require('rmdir');
// var path = './tests/';

// my middleware
// var sitemaprunall = require('../tests/sitemap-runall');
// var buttonsnamerunall = require('../tests/buttons-runall');
// var globalasulinks = require('../tests/globalasulinks');
// var unitnamerunall = require('../tests/unitname-runall');
// var favicon = require('../tests/favicon');

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/* GET testrunner page. */
router.get('/', function(req, res, next) {
  res.json('test runner main page');
});

router.get('/allreports', function(req, res, next) {
  res.json('all reports');
});

router.get('/:reportid', function(req, res, next) {
  var reportid = req.params.reportid;
  res.json(reportid);
});

router.get('/:reportid/:testid', function(req, res, next) {
  var reportid = req.params.reportid;
  var testid = req.params.testid;
  res.json({reportid, testid});
});

module.exports = router;
