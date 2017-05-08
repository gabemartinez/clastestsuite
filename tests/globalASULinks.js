// var globalasulinks = function(req, res, next) {
  // Do something.
  //console.log('globalasulinks mofo!');

  var request = require('request');
  var cheerio = require('cheerio');
  var url = "http://clas.asu.edu";
  //var url = req.body.page;

  var results = [];

  var baselineLinks = [ { text: 'ASU Home', link: '//www.asu.edu/' },
  { text: 'News/Events',
    link: '//www.asu.edu/?feature=newsevents' },
  { text: 'Academics', link: '//www.asu.edu/?feature=academics' },
  { text: 'Research', link: '//www.asu.edu/?feature=research' },
  { text: 'Athletics', link: '//www.asu.edu/?feature=athletics' },
  { text: 'Alumni', link: '//www.asu.edu/?feature=alumni' },
  { text: 'Giving', link: '//www.asu.edu/?feature=giving' },
  { text: 'President', link: '//www.asu.edu/?feature=president' },
  { text: 'About ASU', link: '//www.asu.edu/?feature=aboutasu' },
  { text: 'My ASU', link: '//my.asu.edu/' },
  { text: 'Colleges & Schools', link: '//www.asu.edu/colleges/' },
  { text: 'Arts and Sciences',
    link: '//artsandsciences.asu.edu/' },
  { text: 'Business', link: '//wpcarey.asu.edu/' },
  { text: 'Design and the Arts',
    link: '//herbergerinstitute.asu.edu' },
  { text: 'Education', link: '//education.asu.edu/' },
  { text: 'Engineering', link: '//engineering.asu.edu/' },
  { text: 'Future of Innovation in Society',
    link: '//sfis.asu.edu/' },
  { text: 'Graduate', link: '//graduate.asu.edu' },
  { text: 'Health Solutions', link: '//chs.asu.edu/' },
  { text: 'Honors', link: '//honors.asu.edu/' },
  { text: 'Journalism', link: '//cronkite.asu.edu' },
  { text: 'Law', link: '//www.law.asu.edu/' },
  { text: 'Nursing and Health Innovation',
    link: '//nursingandhealth.asu.edu/' },
  { text: 'Public Service and Community Solutions',
    link: '//copp.asu.edu' },
  { text: 'Sustainability',
    link: '//schoolofsustainability.asu.edu' },
  { text: 'University College', link: '//uc.asu.edu/' },
  { text: 'Thunderbird School of Global Management',
    link: 'http://www.thunderbird.edu/' },
  { text: 'Map & Locations', link: '//www.asu.edu/map/' },
  { text: 'Map', link: '//www.asu.edu/map/' },
  { text: 'Tempe', link: '//campus.asu.edu/tempe/' },
  { text: 'West', link: '//campus.asu.edu/west/' },
  { text: 'Polytechnic', link: '//campus.asu.edu/polytechnic/' },
  { text: 'Downtown Phoenix', link: '//campus.asu.edu/downtown/' },
  { text: 'Online and Extended', link: '//asuonline.asu.edu/' },
  { text: 'Lake Havasu', link: '//havasu.asu.edu/' },
  { text: 'Thunderbird',
    link: 'https://campus.asu.edu/thunderbird' },
  { text: 'Skysong', link: '//skysong.asu.edu/' },
  { text: 'Research Park', link: '//asuresearchpark.com/' },
  { text: 'Washington D.C.', link: '//washingtoncenter.asu.edu/' },
  { text: 'China',
    link: '//wpcarey.asu.edu/mba/china-program/english/' },
  { text: 'Directory', link: '//isearch.asu.edu/' } ];

  //testing url argument site buttons casing
  request(url, function (error, response, html) {

    if (!error && response.statusCode == 200) {

      var $ = cheerio.load(html);

      $('#asu_universal_nav li > a').each(function(i, element){

        var text = $(this).text().trim();
        var link = $(this).attr('href');

        var textLink = {
          text: text,
          link: link
        };

        results.push(textLink);

      });

      baselineLinksObject = JSON.stringify(baselineLinks);
      resultsObject = JSON.stringify(results);

      // console.log(baselineLinksObject);
      // console.log(resultsObject);

      console.log(baselineLinksObject === resultsObject);



      // req.passfail = results;
      // next();

    };

  });

// };

// module.exports = globalasulinks;
