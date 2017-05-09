var buttons = function(req, res, next) {

  var request = require('request');
  var cheerio = require('cheerio');
  var Case = require('case');
  var chalk = require('chalk');

  // var url = "http://clas.asu.edu";
  var url = req.body.page;

  var parsedResults = [];

  //testing url argument site buttons casing
  request(url, function (error, response, html) {

    if (!error && response.statusCode == 200) {

      var $ = cheerio.load(html);

      $('.btn').each(function(i, element){

        var text = $(this).text().trim();
        var casing = Case.of($(this).text().trim());

        if ( (casing == "sentence") || (casing == "header") ){
          var passfail = "PASS";
        } else {
          var passfail = "FAIL";
        }

        var testResults = {
          text: text,
          casing: casing,
          passfail: passfail
        };

        parsedResults.push(testResults);

      });

      req.pf = parsedResults;
      next();

    };

  });

};

module.exports = buttons;
