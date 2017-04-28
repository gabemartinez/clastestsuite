var faviconcheck = function(req, res, next) {
  // Do something.
  console.log('faviconcheck mofo!');

  var imageDiff = require('image-diff');
  var download = require('download-file');
  var request = require('request');
  var cheerio = require('cheerio');

  // var url = "https://math.asu.edu";
  var url = req.body.page;

  var options1 = {
      directory: "./tests/downloadedImages/",
      filename: "favicon.ico"
  };

  var options2 = {
      directory: "./tests/downloadedImages/",
      filename: "apple-touch-icon.png"
  };

  //var parsedResults = [];

  //testing url argument site favicons
  request(url, function (error, response, html) {

    if (!error && response.statusCode == 200) {

      var $ = cheerio.load(html);

      var favIcon = $('link[rel="shortcut icon"]').attr('href');

      var appleTouchIcon = url+$('link[rel="apple-touch-icon"]').attr('href');

      download(favIcon, options1, function(err){
          if (err) throw err
          console.log("favIcon downloaded")
          imageDiff.getFullResult({

            actualImage: './tests/downloadedImages/favicon.ico',
            expectedImage: './tests/baselineImages/favicon.ico',
            diffImage: './tests/resultImages/favicon-difference.ico',
            shadow: true

          }, function (err, imagesAreSame) {
            console.log(imagesAreSame);
          });
      });

      download(appleTouchIcon, options2, function(err){
          if (err) throw err
          console.log("appleTouchIcon downloaded")
          imageDiff.getFullResult({

            actualImage: './tests/downloadedImages/apple-touch-icon.png',
            expectedImage: './tests/baselineImages/apple-touch-icon.png',
            diffImage: './tests/resultImages/apple-touch-icon-difference.png',
            shadow: true

          }, function (err, imagesAreSame) {
            console.log(imagesAreSame);
          });
      });

      // $('div.header__sitename > span').each(function(i, element){
      //
      //   var text = $(this).text().trim();
      //   var casing = Case.of($(this).text().trim());
      //
      //   if ( (casing == "title") || (casing == "capital") ){
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
      //
      // });

      req.pf = "parsedResults";
      next();

    };

  });

};

module.exports = faviconcheck;
