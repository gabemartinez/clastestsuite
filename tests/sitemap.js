var sitemapgen = function(req, res, next) {
  // Do something.
  //console.log('sitemap gen mofo!');

  var request = require('request');
  var cheerio = require('cheerio');

  // var url = "https://clas.asu.edu";
  var url = req.body.page;

  var results = [];

  //testing url argument and building sitemap
  request(url, function (error, response, html) {

    if (!error && response.statusCode == 200) {

      var $ = cheerio.load(html);

      $('#ASUNavMenu li > a').each(function(i, element){

        var link = $(this).attr('href').trim();

        var links = {
          link: link
        };

        // if (link.startsWith(url)) {
        //   results.push(links);
        // }
        results.push(links);

      });

      //console.log(results);

      req.results = results;
      next();

    };

  });

};

module.exports = sitemapgen;
