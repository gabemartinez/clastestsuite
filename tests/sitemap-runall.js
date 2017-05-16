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

        var links = {
          link: url+link
        };

        sitemapLinks.push(links);

      });

      //console.log(results);

      req.sitemapLinks = sitemapLinks;
      next();

    };

    // console.log(results);

  });

};

module.exports = sitemaprunall;
