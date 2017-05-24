var sitemaprunall = function(req, res, next) {

  var request = require('request');
  var cheerio = require('cheerio');

  // var url = "https://clas.asu.edu";
  var url = req.body.page;

  var sitemapLinks = [];

  //testing url argument and building sitemap
  request(url, function (error, response, html) {

    if (!error && response.statusCode == 200) {

      var $ = cheerio.load(html);

      $('#ASUNavMenu li > a').each(function(i, element){

        var link = $(this).attr('href').trim();

        if (link.substring(0, 1) == "/") {
          // link = url+link;
          var links = {
            link: url+link,
            buttonsGrade: 100,
            unitNameGrade: 100,
            globalASULinksGrade: 100,
            faviconGrade: 100,
            logoGrade: 100,
            footerGrade: 100,
            overallGrade: 100,
          };
        } else {
          var links = {
            link: link,
            buttonsGrade: 100,
            unitNameGrade: 100,
            globalASULinksGrade: 100,
            faviconGrade: 100,
            logoGrade: 100,
            footerGrade: 100,
            overallGrade: 100,
          };
        }

        // var links = {
        //   link: link
        // };

        if (links.link.startsWith(url)) {
          sitemapLinks.push(links);
        }
        //
        // "link": "https://clas.asu.edu/resources",
        // "buttonsGrade": 100,
        // "unitNameGrade": 100,
        // "globalASULinksGrade": 100,
        // "faviconGrade": 100,
        // "logoGrade": 100,
        // "footerGrade": 100,
        // "overallGrade": 100

      });

      req.sitemapLinks = sitemapLinks;
      next();

    };

  });

};

module.exports = sitemaprunall;
