var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var app = express();

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

/* GET buttons page. */
router.get('/', function(req, res, next) {
  res.render('buttons', { title: 'Buttons' });
});

// POST /login gets urlencoded bodies
router.post('/', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  res.render('buttons-success', { data: req.body });
  //console.log(req.body);
})

module.exports = router;
