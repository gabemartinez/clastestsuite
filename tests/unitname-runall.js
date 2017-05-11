var unitnamerunall = function(req, res, next) {

  var request = require('request');
  var cheerio = require('cheerio');
  var Case = require('case');
  var chalk = require('chalk');

  // var url = "http://clas.asu.edu";
  var url = req.body.page;

  var parsedResults = [];

  //testing url argument site unit name casing
  request(url, function (error, response, html) {

    if (!error && response.statusCode == 200) {

      var $ = cheerio.load(html);

      $('div.header__sitename > span').each(function(i, element){

        var text = $(this).text().trim();
        var casing = Case.of($(this).text().trim());

        if ( (casing == "title") || (casing == "capital") ){
          var passfail = "PASS";
        } else {
          var passfail = "FAIL";
        }
        //var passfail = $(this).text().trim();

        var testResults = {
          text: text,
          casing: casing,
          passfail: passfail
        };

        parsedResults.push(testResults);

      });

      req.un = parsedResults;
      next();

    };

  });

};

module.exports = unitnamerunall;
