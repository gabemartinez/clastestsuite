var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

var sitemap = require('../tests/sitemap');

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/* GET buttons page. */
router.get('/', function(req, res, next) {
  res.render('../views/pages/sitemap', { title: 'Sitemap Test' });
});

// POST /buttons gets urlencoded bodies
router.post('/', urlencodedParser, sitemap, function (req, res, next) {
  var page = req.body.page;
  var results = req.results;
  res.render('../views/pages/sitemap-success', { title: 'Sitemap Check', page: page, results: results });
});

module.exports = router;
