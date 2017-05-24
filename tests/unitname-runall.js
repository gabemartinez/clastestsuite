var unitnamerunall = function(req, res, next) {

  var sitemapLinks = req.sitemapLinks;
  var cheerio = require('cheerio');
  var Case = require('case');
  var request = require('request-promise')

  function parseSites(urls, callback) {
      var parsedSites = [];
      var promiseList = urls.map(getPage)

      Promise.all(promiseList).then(function (data) {
          callback(data.map(parse))
      })

      return parsedSites;
  }

  function getPage(url) {
      return request.get(url)
  }

  function parse(body) {
      var $ = cheerio.load(body);
      // return $('#header > div > div > div > div.header__sitename > span').text()
      var unitNameCasing = Case.of($('div.header__sitename > span').text().trim());
      if ( (unitNameCasing == "title") || (unitNameCasing == "capital") ){
        return "PASS";
      } else {
        return "FAIL";
      }

  }

  parseSites(sitemapLinks,function(data) {
      // console.log(data)
      req.unitNamesResults = data;
      next();
  })

};

module.exports = unitnamerunall;
