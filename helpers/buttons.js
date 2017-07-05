var mongoose = require('mongoose');
var mongoconnection = 'mongodb://clastest:blah33@ds143141.mlab.com:43141/clastestsuite';
mongoose.connect(mongoconnection);
var Site = require('../models/Site');

var cheerio = require('cheerio');
var Case = require('case');
var request = require('request');

// helpers/buttons.js
module.exports = function(siteid) {
  // return 'this side id' + siteid;
  // console.log(siteid);

  Site.findById(siteid, function (err, site) {

      if (err) {

        console.log(err);

      } if (site) {

        console.log(site);

        //testing url argument site buttons casing
        request('https://clas.asu.edu/resources/academic-integrity-resources', function (error, response, html) {

          if (!error && response.statusCode == 200) {

            var $ = cheerio.load(html);
            console.log(html);

            // $('.btn').each(function(i, element){
            //
            //   var text = $(this).text().trim();
            //   var casing = Case.of($(this).text().trim());
            //
            //   if ( (casing == "sentence") || (casing == "header") ){
            //     var passfail = "PASS";
            //   } else {
            //     var passfail = "FAIL";
            //   }
            //
            //   var testResults = {
            //     text: text,
            //     casing: casing,
            //     passfail: passfail
            //   };
            //
            //   parsedResults.push(testResults);

            // });

            // req.pf = parsedResults;
            // next();

          };

        });

      } else {

        console.log("No site found with that ID.");

      }

  });

}
