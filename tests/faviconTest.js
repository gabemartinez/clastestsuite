// var unitnamecheck = function(req, res, next) {
  // Do something.
  //console.log('unitnamecheck mofo!');

  var imageDiff = require('image-diff');
  var download = require('download-file');
  var request = require('request');
  var cheerio = require('cheerio');
  var sleep = require('sleep');

  var url = "https://math.asu.edu";
  //var url = req.body.page;

  //var parsedResults = [];

  //testing url argument site unit name casing
  request(url, function (error, response, html) {

    if (!error && response.statusCode == 200) {

      var $ = cheerio.load(html);

      var favIcon = $('link[rel="shortcut icon"]').attr('href');

      var appleTouchIcon = url+$('link[rel="apple-touch-icon"]').attr('href');

      //console.log(favIcon);
      //console.log(url+appleTouchIcon);

      var options1 = {
          directory: "./tests/downloadedImages/",
          filename: "favicon.ico"
      };

      download(favIcon, options1, function(err){
          if (err) throw err
          console.log("favIcon downloaded")
      });

      var options2 = {
          directory: "./tests/downloadedImages/",
          filename: "apple-touch-icon.png"
      };

      download(appleTouchIcon, options2, function(err){
          if (err) throw err
          console.log("appleTouchIcon downloaded")
      });

      // ./tests/downloadedImages/favicon.ico
      // ./tests/baselineImages/favicon.ico

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

      // req.pf = parsedResults;
      // next();

    };

    sleep.sleep(5); // sleep

    imageDiff({

      // actualImage: './tests/downloadedImages/favicon.ico',
      // expectedImage: './tests/baselineImages/favicon.ico',
      // diffImage: './tests/resultImages/favicon-difference.ico',

      actualImage: './tests/downloadedImages/apple-touch-icon.png',
      expectedImage: './tests/baselineImages/apple-touch-icon.png',
      diffImage: './tests/resultImages/apple-touch-icon-difference.png',

    }, function (err, imagesAreSame) {
      // error will be any errors that occurred
      // imagesAreSame is a boolean whether the images were the same or not
      // diffImage will have an image which highlights differences
      console.log(imagesAreSame);
    });

  });






// };
//
// module.exports = unitnamecheck;
