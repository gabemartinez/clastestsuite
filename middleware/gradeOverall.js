var gradeOverall = function(req, res, next) {

  var mongoose = require('mongoose');
  var mongoconnection = 'mongodb://clastest:blah33@ds143141.mlab.com:43141/clastestsuite';
  mongoose.createConnection(mongoconnection);

  var ButtonsTest = require('../models/ButtonsTest');

  var unitnameid = req.params.reportid;

  ButtonsTest.find({"siteID": unitnameid}, function (err, data) {

      if (err) {
          res.status(500).send(err)
      } else {
        // console.log(data[0]);
        data.forEach(function(element) {
            console.log(element.pageLink);
        });
      }

      // req.overallgrade = data;
      // next();

  });

  req.overallgrade = 'data goes here';
  next();

};

module.exports = gradeOverall;
