var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

var buttoncheck = require('../tests/buttonsTextSentenceCasing');

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// custom middleware
// function checkButtons(req, res, next) {
//   console.log("blakkow middleware mofo");
//   next();
// };

// app.use(checkButtons);

/* GET buttons page. */
router.get('/', function(req, res, next) {
  res.render('buttons', { title: 'Buttons' });
});

// POST /buttons gets urlencoded bodies
router.post('/', urlencodedParser, buttoncheck, function (req, res, next) {
  var page = req.body.page;
  var pf = req.pf;
  res.render('buttons-success', { page: page, pf: pf });
});

module.exports = router;
