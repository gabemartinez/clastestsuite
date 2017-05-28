var websparkcheck = function(req, res, next) {

  var request = require('request');
  var cheerio = require('cheerio');

  var site = req.body.site;

  //testing site argument site unit name casing
  request(site, function (error, response, html) {

    if (!error && response.statusCode == 200){

      var $ = cheerio.load(html);

      var websparkversion = $('meta[http-equiv="X-Name-of-Distro"]').attr('content');

      };

      if (typeof websparkversion === 'undefined' || !websparkversion) {
      //  site = req.body.site;
       console.log(site);
       res.render('/pages/notwebspark');
      } else {
       next();
      };

    });

};

module.exports = websparkcheck;
