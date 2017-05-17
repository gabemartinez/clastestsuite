var unitnamerunall = function(req, res, next) {

  var sitemapLinks = req.sitemapLinks;

  var request = require('request');
  var cheerio = require('cheerio');
  var Case = require('case');

  // console.log('here we go');
  console.log(sitemapLinks.length);
  // console.log(sitemapLinks[0].link);

  var emptyResults = [];

  sitemapLinks.forEach(function(entry) {

      // console.log(entry.link);

      //testing url argument site unit name casing
      request(entry.link, function (error, response, html) {

        if (!error && response.statusCode == 200) {

          var $ = cheerio.load(html);
          var unitNameText = $('div.header__sitename > span').text().trim();
          var unitNameCasing = Case.of($('div.header__sitename > span').text().trim());

          if ( (unitNameCasing == "title") || (unitNameCasing == "capital") ){
            var unitNamePassFail = "PASS";
          } else {
            var unitNamePassFail = "FAIL";
          }

          var testResults = {
            unitNameLink: entry.link,
            unitNameText: unitNameText,
            unitNameCasing: unitNameCasing,
            unitNamePassFail: unitNamePassFail
          };

          emptyResults.push(testResults);

        };

        req.unitNameResults = emptyResults;
        // console.log(emptyResults);
        next();

      });

  });

};

module.exports = unitnamerunall;
