// var express = require('express')
// var app = express()

var request = require('request')
var cheerio = require('cheerio')
var Case = require('case')

var url = process.argv[2];

// GET method route
// app.get('/', function (req, res) {
//   res.send('GET request to the homepage')
// })

// POST method route
// app.post('/', function (req, res) {
//   res.send('POST request to the homepage')
// })

// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!')
// })

//testing url argument site buttons
request(url, function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html)
    $('.btn').each(function(i, element){
      var buttonTexts = $(this);
      if (Case.of(buttonTexts.text()) == "sentence"){
        var pf = "PASS"
      } else if (Case.of(buttonTexts.text()) == "header") {
        var pf = "PASS"
      } else {
        var pf = "FAIL"
      }
      process.stdout.write("Button Text: " + buttonTexts.text().trim() + " / Casing Style: " + Case.of(buttonTexts.text()) + " / PASS-FAIL: " + pf + "\n");
      // console.log(buttonTexts.text());
      // console.log(Case.of(buttonTexts.text()));
    });
  }
})
