var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

var buttons = require('../tests/buttons');

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
  res.render('../views/pages/buttons', { title: 'Buttons Test' });
});

// POST /buttons gets urlencoded bodies
router.post('/', urlencodedParser, buttons, function (req, res, next) {
  var page = req.body.page;
  var pf = req.pf;
  res.render('../views/pages/buttons-success', { title: 'Buttons Test', page: page, pf: pf });
});

module.exports = router;
