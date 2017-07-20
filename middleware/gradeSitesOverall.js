var gradeSitesOverall = function(req, res, next) {

  var mongoose = require('mongoose');
  var mongoconnection = 'mongodb://clastest:blah33@ds143141.mlab.com:43141/clastestsuite';
  mongoose.createConnection(mongoconnection);

  var Test = require('../models/Test');

  var Case = require('case');
  var isNumber = require('is-number');

  var unitnameid = req.params.reportid;

  var overallgradeobject = [];
  var allsitegradeshere = [];

  var allsitegradeobject = req.allsitegradeobject;
  // console.log(allsitegradeobject);

  allsitegradeobject.forEach(function(allsitesstuff) {

  Test.find({"siteID": allsitesstuff.siteid}, function (err, data) {

      if (err) {
          res.status(500).send(err)
      } else {

        data.forEach(function(element) {

            // unit name grade
            var ourUnitName = element.results[0].unitName;
            var ourUnitNameCasing = Case.of(ourUnitName);
            if (ourUnitNameCasing == 'title'){
              var unitnamegrade = 100;
            } else {
              var unitnamegrade = 0;
            }
            // unit name grade

            // global asu links grade
            var baselineLinks = [ 'ASU Home', 'News/Events', 'Academics', 'Research', 'Athletics', 'Alumni', 'Giving', 'President', 'About ASU', 'My ASU', 'Colleges & Schools', 'Arts and Sciences', 'Business', 'Design and the Arts', 'Education', 'Engineering', 'Future of Innovation in Society', 'Graduate', 'Health Solutions', 'Honors', 'Journalism', 'Law', 'Nursing and Health Innovation', 'Public Service and Community Solutions', 'Sustainability', 'University College', 'Thunderbird School of Global Management', 'Map & Locations', 'Map', 'Tempe', 'West', 'Polytechnic', 'Downtown Phoenix', 'Online and Extended', 'Lake Havasu', 'Thunderbird', 'Skysong', 'Research Park', 'Washington D.C.', 'China', 'Directory', ];

            var ourGlobalASULinks = element.results[0].globalasulinks;

            baselineLinksObject = JSON.stringify(baselineLinks);
            ourLinksObject = JSON.stringify(ourGlobalASULinks);

            var globalasulinksgrade = baselineLinksObject === ourLinksObject ? 100 : 0;
            // global asu links grade

            // buttons grade
            var ourButtonsData = element.results[0].buttons;
            var ourButtonsPossibleTotal = element.results[0].buttons.length*100;
            var correctAnswers = 0;

            for(var i = 0; i < ourButtonsData.length; ++i){
                if((Case.of(ourButtonsData[i]) == 'sentence')||(Case.of(ourButtonsData[i]) == 'header')){
                  correctAnswers++;
                }
            }

            var ourButtonsGrade = correctAnswers*100;

            var buttonsgrade = Math.round((ourButtonsGrade/ourButtonsPossibleTotal)*100);
            if (isNumber(buttonsgrade)){
              var buttonsgrade = Math.round((ourButtonsGrade/ourButtonsPossibleTotal)*100);
            } else {
              var buttonsgrade = 0;
            }
            // buttons grade

            var pagegrade = Math.round(((unitnamegrade + globalasulinksgrade + buttonsgrade) / 300)*100);
            if (isNumber(pagegrade)){
              var pagegrade = Math.round(((unitnamegrade + globalasulinksgrade + buttonsgrade) / 300)*100);
            } else {
              var pagegrade = 0;
            }

            var singleoverallgrade = {
              pagelink: element.pageLink,
              pagegrade: pagegrade,
              pageid: element._id
            };

            overallgradeobject.push(singleoverallgrade);

        });

      }

      var sum = 0;
      for(var i = 0; i < overallgradeobject.length; ++i){
            sum += overallgradeobject[i].pagegrade;
      }

      var overallsitegrade = Math.round(sum/overallgradeobject.length);
      // console.log(overallsitegrade);

      var oursitegrade = {
        siteid: allsitesstuff.siteid,
        url: allsitesstuff.url,
        date: allsitesstuff.reportdate,
        grade: overallsitegrade
      };

      allsitegradeshere.push(oursitegrade);
      // console.log(allsitegradeshere);

      req.allsitegradeshere = allsitegradeshere;
      next();
      // req.overallgradeobject = overallgradeobject;

  });

});

};

module.exports = gradeSitesOverall;
