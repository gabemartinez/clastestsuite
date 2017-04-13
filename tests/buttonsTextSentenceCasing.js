var buttoncheck = function(req, res, next) {
  // Do something.
  console.log('buttoncheck mofo!');

  var request = require('request')
  var cheerio = require('cheerio')
  var Case = require('case')
  const chalk = require('chalk')

  var url = "http://clas.asu.edu";

  //testing url argument site buttons casing
  request(url, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html)
      $('.btn').each(function(i, element){
        var buttonTexts = $(this);
        if (Case.of(buttonTexts.text()) == "sentence"){
          //var pf = "PASS";
          process.stdout.write("Button Text: " + buttonTexts.text().trim() + " / PASS-FAIL: " + chalk.bold.green("PASS \n"));
        } else if (Case.of(buttonTexts.text()) == "header") {
          //var pf = "PASS";
          process.stdout.write("Button Text: " + buttonTexts.text().trim() + " / PASS-FAIL: " + chalk.bold.green("PASS \n"));
        } else {
          //var pf = "FAIL";
          process.stdout.write("Button Text: " + buttonTexts.text().trim() + " / PASS-FAIL: " + chalk.bold.red("FAIL \n"));
        }
        //process.stdout.write("Button Text: " + buttonTexts.text().trim() + " / Casing Style: " + Case.of(buttonTexts.text()) + " / PASS-FAIL: " + pf + "\n");
        // console.log(buttonTexts.text());
        // console.log(Case.of(buttonTexts.text()));
      });
    }
  })

  next();
}

module.exports = buttoncheck;
