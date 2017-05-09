var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

var unitname = require('../tests/unitname');

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/* GET unitname page. */
router.get('/', function(req, res, next) {
  res.render('../views/pages/unitname', { title: 'Unit Name Test' });
});

// POST gets /unitname urlencoded bodies
router.post('/', urlencodedParser, unitname, function (req, res, next) {
  var page = req.body.page;
  var pf = req.pf;
  res.render('../views/pages/unitname-success', { title: 'Unit Name Test', page: page, pf: pf });
});

module.exports = router;
