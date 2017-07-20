var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var mongoconnection = 'mongodb://clastest:blah33@ds143141.mlab.com:43141/clastestsuite';
mongoose.connect(mongoconnection);

var Site = require('../models/Site');
var Test = require('../models/Test');

const Agenda = require('agenda');

var jsonParser = bodyParser.json();

var urlencodedParser = bodyParser.urlencoded({ extended: false });

//-- Helpers

var test = require("../helpers/test");

//-- Middleware

var websparkcheck = require('../middleware/websparkcheck');
var sitemap = require('../middleware/sitemap');
var gradeUnitName = require('../middleware/gradeUnitName');
var gradeGlobalASULinks = require('../middleware/gradeGlobalASULinks');
var gradeButtons = require('../middleware/gradeButtons');
var gradeOverall = require('../middleware/gradeOverall');
var allSiteGrades = require('../middleware/allSiteGrades');
var gradeSitesOverall = require('../middleware/gradeSitesOverall');

//-- Routes

/* GET index page. */
router.get('/', function(req, res, next) {
  res.render('../views/pages/index');
});

/* POST index page. */
router.post('/', urlencodedParser, websparkcheck, sitemap, function(req, res, next) {

  var site = req.body.site;
  var sitemapLinks = req.sitemapLinks;

  var thisSite = new Site({ url: site, links: sitemapLinks });
  thisSite.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      // console.log(thisSite);
    }
  });

  // agenda process
  var agenda = new Agenda({db: {address: mongoconnection}});

  agenda.define('check dom', function(job, done) {
    console.log('checking dom...');
    // console.log(job);
    var thisSiteID = thisSite._id;
    test(thisSiteID);
    done();
  });

  agenda.on('ready', function() {
    agenda.now('check dom');
    agenda.start();
  });
  // agenda process

  res.render('../views/pages/started', { site, thisId: thisSite._id });
});

/* GET not webspark error page. */
router.get('/notwebspark', function(req, res, next) {
  var site = req.body.site;
  res.render('../views/pages/notwebspark', { site });
});

/* GET allreports page. */
router.get('/allreports', allSiteGrades, function(req, res, next) {
  var allsitegradeobject = req.allsitegradeobject;
  // var allsitegradeshere = req.allsitegradeshere;
  // console.log(allsitegradeobject);
  // console.log(allsitegradeobject);

  // res.send(allsitegradeobject);
  res.render('../views/pages/allreports', { allsitegradeobject });

});

/* GET report by id page. */
router.get('/report/:reportid', gradeOverall, function(req, res, next) {
  var reportid = req.params.reportid;
  var overallgradeobject = req.overallgradeobject;
  var overallsitegrade = req.overallsitegrade;
  // res.json({reportid});

  // If query IS passed into .find(), filters by the query parameters
  Test.find({"siteID": reportid}, function (err, buttonstests) {
      if (err) {
          res.status(500).send(err)
      } else {
          // res.send(buttonstests);
          Site.find({"_id": reportid}, function (err, thissite) {
            res.render('../views/pages/single-report', { buttonstests, reportid, thissite, overallgradeobject, overallsitegrade });
          } );
      }
  });
});

/* GET report by id page. sortable */
router.get('/report-sortable/:reportid', gradeOverall, function(req, res, next) {
  var reportid = req.params.reportid;
  var overallgradeobject = req.overallgradeobject;
  var overallsitegrade = req.overallsitegrade;
  // res.json({reportid});

  // If query IS passed into .find(), filters by the query parameters
  Test.find({"siteID": reportid}, function (err, buttonstests) {
      if (err) {
          res.status(500).send(err)
      } else {
          // res.send(buttonstests);
          Site.find({"_id": reportid}, function (err, thissite) {
            res.render('../views/pages/single-report-sort', { buttonstests, reportid, thissite, overallgradeobject, overallsitegrade });
          } );
      }
  });
});

/* GET page specific report. */
router.get('/report/:reportid/:pageid', gradeUnitName, gradeGlobalASULinks, gradeButtons, function(req, res, next) {
  var reportid = req.params.reportid;
  var pageid = req.params.pageid;
  var unitnamegrade = req.unitnamegrade;
  var globalasulinksgrade = req.globalasulinksgrade;
  var buttonsgrade = req.buttonsgrade;

  // If query IS passed into .find(), filters by the query parameters
  Test.find({"_id": pageid, "siteID": reportid}, function (err, buttonstests) {
      if (err) {
          res.status(500).send(err)
      } else {
          res.render('../views/pages/single-page-report', {reportid, pageid, buttonstests, unitnamegrade, globalasulinksgrade, buttonsgrade});
      }
  });
});

/* GET Unit Name Test specific report from page. */
router.get('/unitnamereport/:reportid/:pageid/', gradeUnitName, function(req, res, next) {
  var reportid = req.params.reportid;
  var pageid = req.params.pageid;
  var unitnamegrade = req.unitnamegrade;
  var unitnamewithgrade = req.unitnamewithgrade;

  Test.findOne({'siteID': reportid, '_id': pageid}, function (err, data) {
      if (err) {
          res.status(500).send(err)
      } else {
          res.render('../views/pages/unitname-test-report', { data, unitnamegrade, unitnamewithgrade });
      }
  });

});

/* GET Global ASU Links Test specific report from page. */
router.get('/globalasulinksreport/:reportid/:pageid/', gradeGlobalASULinks, function(req, res, next) {
  var reportid = req.params.reportid;
  var pageid = req.params.pageid;
  var globalasulinksgrade = req.globalasulinksgrade;
  var baselineLinksObject = JSON.parse(req.baselineLinksObject);

  Test.findOne({'siteID': reportid, '_id': pageid}, function (err, data) {
      if (err) {
          res.status(500).send(err)
      } else {
          res.render('../views/pages/globalasulinks-test-report', { data, globalasulinksgrade, baselineLinksObject });
      }
  });

});

/* GET Buttons Report Test specific report from page. */
router.get('/buttonsreport/:reportid/:pageid/', gradeButtons, function(req, res, next) {
  var reportid = req.params.reportid;
  var pageid = req.params.pageid;
  var buttonsgrade = req.buttonsgrade;
  var buttonswithgrades = req.buttonswithgrades;

  Test.findOne({'siteID': reportid, '_id': pageid}, function (err, data) {
      if (err) {
          res.status(500).send(err)
      } else {
          res.render('../views/pages/buttons-test-report', { data, buttonsgrade, buttonswithgrades });
      }
  });

});

module.exports = router;
