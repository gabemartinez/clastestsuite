var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

var globalasulinks = require('../tests/globalasulinks');

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/* GET globalasulinks page. */
router.get('/', function(req, res, next) {
  res.render('../views/pages/globalasulinks', { title: 'Global ASU Links Test' });
});

// POST /globalasulinks gets urlencoded bodies
router.post('/', urlencodedParser, globalasulinks, function (req, res, next) {
  var page = req.body.page;
  var passfail = req.passfail;
  res.render('../views/pages/globalasulinks-success', { title: 'Global ASU Links Test', page: page, passfail: passfail });
});

module.exports = router;
