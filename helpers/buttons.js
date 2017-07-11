var mongoose = require('mongoose');
var mongoconnection = 'mongodb://clastest:blah33@ds143141.mlab.com:43141/clastestsuite';
mongoose.connect(mongoconnection);
var Site = require('../models/Site');
var ButtonsTest = require('../models/ButtonsTest');

var cheerio = require('cheerio');
var Case = require('case');
var request = require('request-promise');

// helpers/buttons.js
module.exports = function(siteid) {
  // return 'this site id' + siteid;
  // console.log(siteid);

  Site.findById(siteid, function(err, site) {

      if (err) {

        //found an error
        console.log(err);

      } if (site) {

        //
        var testButtonsData = new ButtonsTest({ siteID: siteid, results: [{buttonText:'blahh', passFail: 'pass'},{buttonText:'blahhh', passFail: 'fail'}] });
        testButtonsData.save(function (err) {
          if (err) {
            console.log(err);
          } else {
            // console.log(testButtonsData);
          }
        });
        //

        //site object found, parse through it
        var parsedResults = [];
        var urls = site.links;

        function parseSites(urls, callback) {
            var parsedSites = [];
            var promiseList = urls.map(getPage);

            Promise.all(promiseList).then(function(data) {
                callback(data.map(parse));
            })

            return parsedSites;
        }

        function getPage(url) {
            return request.get(url);
        }

        function parse(body) {
            var $ = cheerio.load(body);
            $('.btn').each(function(i, element){

              var buttonText = $(this).text().trim();
              var casing = Case.of($(this).text().trim());

              if ( (casing == "sentence") || (casing == "header") ){
                var passfail = "PASS";
              } else {
                var passfail = "FAIL";
              }

              console.log(i);
              console.log(buttonText);
              console.log(passfail);

              // var testResults = {
              //   buttonText: buttonText,
              //   casing: casing,
              //   passfail: passfail
              // };
              //
              // parsedResults.push(testResults);

            });

        }

        parseSites(urls, function(data) {
            // console.log(data)
            // req.buttonsNamesResults = data;
            // next();
        })

      } else {

        console.log("No site found with that ID.");

      }

  });

}
