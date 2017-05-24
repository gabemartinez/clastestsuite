var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

var fs = require('fs');

// var rmdir = require('rmdir');
// var path = './tests/';

// my middleware
var sitemaprunall = require('../tests/sitemap-runall');
// var buttonsnamerunall = require('../tests/buttons-runall');
// var globalasulinks = require('../tests/globalasulinks');
// var unitnamerunall = require('../tests/unitname-runall');
// var favicon = require('../tests/favicon');

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/* GET runall page. */
router.get('/', function(req, res, next) {
  // rmdir(path + '/downloadedImages', function (err, dirs, files) {
  //   console.log(dirs);
  //   console.log(files);
  //   console.log('all files are removed');
  // });
  // rmdir(path + '/resultImages', function (err, dirs, files) {
  //   console.log(dirs);
  //   console.log(files);
  //   console.log('all files are removed');
  // });
  res.render('../views/pages/runall', { title: 'Run All Tests' });
});

router.get('/singlegrade/:dataid/:linkid', function(req, res, next) {
  // console.log(req.params);
  // res.json(req.params);
  var dataid = req.params.dataid;
  var linkid = req.params.linkid;
  var data = require('../somedata/'+dataid+'.json');
  res.render('../views/pages/singlegrade', { title: 'Single Page Grade', linkid, data });
});

// POST /runall gets urlencoded bodies
router.post('/', urlencodedParser, function (req, res, next) {
  var url = req.body.page;
  // console.log(url);
  var data = require('../somedata/'+url+'.json');
  // var datanourl = req.body.page;
  // var sitemapLinks = req.sitemapLinks;

  //res.render('../views/pages/runall-success', { title: 'Run All Test', page: page, results: results, un: un });
  res.render('../views/pages/runall-success', { title: 'Site Test Report', url: url, data, url });
});

module.exports = router;
