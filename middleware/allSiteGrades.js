var allSiteGrades = function(req, res, next) {

  var mongoose = require('mongoose');
  var mongoconnection = 'mongodb://clastest:blah33@ds143141.mlab.com:43141/clastestsuite';
  mongoose.createConnection(mongoconnection);

  var Site = require('../models/Site');

  var Case = require('case');
  var isNumber = require('is-number');

  var gradeOverall = require('../middleware/gradeOverall');

  var allsitegradeobject = [];

      Site.find(function (err, sites) {

          if (err) {

              res.status(500).send(err)

          } else {

          sites.forEach(function(eachsite) {

            var site = {
              siteid: eachsite._id,
              reportdate: eachsite.created_at,
              url: eachsite.url
            };

            allsitegradeobject.push(site);

          });

          }

          req.allsitegradeobject = allsitegradeobject;
          next();

      });

};

module.exports = allSiteGrades;
