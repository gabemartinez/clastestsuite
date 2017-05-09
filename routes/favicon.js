var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

var favicon = require('../tests/favicon');

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/* GET favicon page. */
router.get('/', function(req, res, next) {
  res.render('../views/pages/favicon', { title: 'Favicon Test' });
});

// POST /favicon gets urlencoded bodies
router.post('/', urlencodedParser, favicon, function (req, res, next) {
  var page = req.body.page;
  var favicondp = req.favicondp;
  var appleicondp = req.appleicondp;
  res.render('../views/pages/favicon-success', { title: 'Favicon Test', page: page, favicondp: favicondp, appleicondp: appleicondp });
});

module.exports = router;
