var unitnamerunall = function(req, res, next) {

  var sitemapLinks = req.sitemapLinks;

  var request = require('request');
  var cheerio = require('cheerio');
  var Case = require('case');

  // console.log('here we go');
  // console.log(sitemapLinks.length);

  var emptyResults = [];

  for (i = 0; i < sitemapLinks.length; i++) {
      // console.log(sitemapLinks[i].link);

      //testing url argument site unit name casing
      request(sitemapLinks[i].link, function (error, response, html) {

        if (!error && response.statusCode == 200) {

          var $ = cheerio.load(html);

          var unitNameText = $('div.header__sitename > span').text().trim();

          var unitNameCasing = Case.of(unitNameText);

          if ( (unitNameCasing == "title") || (unitNameCasing == "capital") ){
            var unitNamePassFail = "PASS";
          } else {
            var unitNamePassFail = "FAIL";
          }

          // console.log(passfail);

          var unitnameResult = {
            unitNameText: unitNameText,
            unitNameCasing: unitNameCasing,
            unitNamePassFail: unitNamePassFail
          };

          emptyResults.push(unitnameResult);
        };

        req.unitnameResults = emptyResults;

      });

      console.log(req.unitnameResults);
      // next();

  }

};

module.exports = unitnamerunall;
