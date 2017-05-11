var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

var rmdir = require('rmdir');
var path = './tests/';

// my middleware
var buttons = require('../tests/buttons');
var globalasulinks = require('../tests/globalasulinks');
var unitname = require('../tests/unitname');
var favicon = require('../tests/favicon');

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/* GET runall page. */
router.get('/', function(req, res, next) {
  rmdir(path + '/downloadedImages', function (err, dirs, files) {
    console.log(dirs);
    console.log(files);
    console.log('all files are removed');
  });
  rmdir(path + '/resultImages', function (err, dirs, files) {
    console.log(dirs);
    console.log(files);
    console.log('all files are removed');
  });
  res.render('../views/pages/runall', { title: 'Run All Test' });
});

// POST /runall gets urlencoded bodies
router.post('/', urlencodedParser, buttons, globalasulinks, unitname, favicon, function (req, res, next) {
  var page = req.body.page;
  var pf = req.pf;
  var passfail = req.passfail;
  var un = req.un;
  var favicondp = req.favicondp;
  var appleicondp = req.appleicondp;
  res.render('../views/pages/runall-success', { title: 'Run All Test', page: page, pf: pf, passfail: passfail, un: un, favicondp: favicondp, appleicondp: appleicondp });
});

module.exports = router;
