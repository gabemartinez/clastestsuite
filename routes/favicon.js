var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

var faviconcheck = require('../tests/faviconTest');

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/* GET buttons page. */
router.get('/', function(req, res, next) {
  res.render('../views/pages/favicon', { title: 'Favicon Test' });
});

// POST /buttons gets urlencoded bodies
router.post('/', urlencodedParser, faviconcheck, function (req, res, next) {
  var page = req.body.page;
  var favicondp = req.favicondp;
  var appleicondp = req.appleicondp;
  res.render('../views/pages/favicon-success', { title: 'Favicon Test', page: page, favicondp: favicondp, appleicondp: appleicondp });
});

module.exports = router;
