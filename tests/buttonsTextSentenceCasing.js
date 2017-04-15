var buttoncheck = function(req, res, next) {
  // Do something.
  console.log('buttoncheck mofo!');

  var request = require('request')
  var cheerio = require('cheerio')
  var Case = require('case')
  var chalk = require('chalk')

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
        //var passfail = $(this).text().trim();

        var testResults = {
          text: text,
          casing: casing,
          passfail: passfail
        };

        parsedResults.push(testResults);

      });

      //var pf = parsedResults;
      console.log('1asdf');
      console.log(parsedResults);

      req.pf = parsedResults;
      next();

    };

    //console.log('2asdf');
    //console.log(parsedResults);

    // req.pf = parsedResults;
    // next();

  });

  //console.log('3asdf');
  //console.log(parsedResults);

  // req.pf = parsedResults;
  // next();

};

module.exports = buttoncheck;
