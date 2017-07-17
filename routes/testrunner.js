var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var phantom = require('phantom');

var mongoose = require('mongoose');
var mongoconnection = 'mongodb://clastest:blah33@ds143141.mlab.com:43141/clastestsuite';
mongoose.connect(mongoconnection);
var Site = require('../models/Site');
var ButtonsTest = require('../models/ButtonsTest');

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

//-- Routes

/* GET testrunner page. */
router.get('/', function(req, res, next) {
  res.render('../views/pages/testrunner');
});

/* POST testrunner page. */
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

  // agenda.define('check buttons', function(job, done) {
  //   console.log('checking buttons...');
  //   console.log(job);
  //   var thisSiteID = thisSite._id;
  //   buttons(thisSiteID);
  // });

  // agenda.define('check unitnames', function(job, done) {
  //   console.log('checking unitnames...');
  //   console.log(job);
  //   var thisSiteID = thisSite._id;
  //   unitnames(thisSiteID);
  // });

  // agenda.define('check global asu links', function(job, done) {
  //   console.log('checking global asu links...');
  //   console.log(job);
  //   var thisSiteID = thisSite._id;
  //   globalasulinks(thisSiteID);
  // });

  agenda.on('ready', function() {
    agenda.now('check dom');
    // agenda.now('check buttons');
    // agenda.now('check unitnames');
    // agenda.now('check global asu links');
    // agenda.every('2 minutes', 'check buttons');
    agenda.start();
  });
  // agenda process

  res.render('../views/pages/testrunner-started', { site, thisId: thisSite._id });
});

/* GET not webspark error page. */
router.get('/notwebspark', function(req, res, next) {
  var site = req.body.site;
  res.render('../views/pages/notwebspark', { site });
});

/* GET allreports page. */
router.get('/allreports', function(req, res, next) {
  // res.json('all reports');
  Site.find(function (err, sites) {
      if (err) {
          res.status(500).send(err)
      } else {
          // send the list of all sites
          // res.json(sites);
          res.render('../views/pages/allreports', { sites });
      }
  });
});

/* GET report by id page. */
router.get('/report/:reportid', gradeOverall, function(req, res, next) {
  var reportid = req.params.reportid;
  var overallgradeobject = req.overallgradeobject;
  // res.json({reportid});

  // If query IS passed into .find(), filters by the query parameters
  ButtonsTest.find({"siteID": reportid}, function (err, buttonstests) {
      if (err) {
          res.status(500).send(err)
      } else {
          // res.send(buttonstests);
          Site.find({"_id": reportid}, function (err, thissite) {
            res.render('../views/pages/single-report', { buttonstests, reportid, thissite, overallgradeobject });
          } );
      }
  });
});

/* GET report by id page. sortable */
router.get('/report-sortable/:reportid', gradeOverall, function(req, res, next) {
  var reportid = req.params.reportid;
  var overallgradeobject = req.overallgradeobject;
  // res.json({reportid});

  // If query IS passed into .find(), filters by the query parameters
  ButtonsTest.find({"siteID": reportid}, function (err, buttonstests) {
      if (err) {
          res.status(500).send(err)
      } else {
          // res.send(buttonstests);
          Site.find({"_id": reportid}, function (err, thissite) {
            res.render('../views/pages/single-report-sort', { buttonstests, reportid, thissite, overallgradeobject });
          } );
      }
  });
});

/* GET download pdf single-report. */
router.get('/savesitereport/:reportid', function(req, res, next) {

  var reportid = req.params.reportid;

  phantom.create().then(function(ph) {
      ph.createPage().then(function(page) {
        //viewportSize being the actual size of the headless browser
        page.property("viewportSize", {width: 960, height: 1080});
        //the rest of the code is the same as the previous example
          page.open("http://localhost:3000/testrunner/report/"+reportid).then(function(status) {
              page.render('./public/pdfreports/site_report_'+reportid+'.pdf').then(function() {
                  console.log(reportid);
                  console.log('Single-report PDF Rendered');
                  ph.exit();
                  res.download('./public/pdfreports/site_report_'+reportid+'.pdf');
              });
          });
      });
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
  ButtonsTest.find({"_id": pageid, "siteID": reportid}, function (err, buttonstests) {
      if (err) {
          res.status(500).send(err)
      } else {
          res.render('../views/pages/single-page-report', {reportid, pageid, buttonstests, unitnamegrade, globalasulinksgrade, buttonsgrade});
      }
  });
});

/* GET download pdf single-page-report. */
router.get('/savesitereport/:reportid/:pageid', function(req, res, next) {

  var reportid = req.params.reportid;
  var pageid = req.params.pageid;

  phantom.create().then(function(ph) {
      ph.createPage().then(function(page) {
        //viewportSize being the actual size of the headless browser
        page.property("viewportSize", {width: 960, height: 1080});
        //the rest of the code is the same as the previous example
          page.open("http://localhost:3000/testrunner/report/"+reportid+'/'+pageid).then(function(status) {
              page.render('./public/pdfreports/page_report_'+reportid+'_'+pageid+'.pdf').then(function() {
                  console.log(reportid);
                  console.log('Single-page-report PDF Rendered');
                  ph.exit();
                  res.download('./public/pdfreports/page_report_'+reportid+'_'+pageid+'.pdf');
              });
          });
      });
  });

});

/* GET Unit Name Test specific report from page. */
router.get('/unitnamereport/:reportid/:pageid/', gradeUnitName, function(req, res, next) {
  var reportid = req.params.reportid;
  var pageid = req.params.pageid;
  var unitnamegrade = req.unitnamegrade;

  ButtonsTest.findOne({'siteID': reportid, '_id': pageid}, function (err, data) {
      if (err) {
          res.status(500).send(err)
      } else {
          res.render('../views/pages/unitname-test-report', { data, unitnamegrade });
      }
  });

});

/* GET Global ASU Links Test specific report from page. */
router.get('/globalasulinksreport/:reportid/:pageid/', gradeGlobalASULinks, function(req, res, next) {
  var reportid = req.params.reportid;
  var pageid = req.params.pageid;
  var globalasulinksgrade = req.globalasulinksgrade;

  ButtonsTest.findOne({'siteID': reportid, '_id': pageid}, function (err, data) {
      if (err) {
          res.status(500).send(err)
      } else {
          res.render('../views/pages/globalasulinks-test-report', { data, globalasulinksgrade });
      }
  });

});

/* GET Buttons Report Test specific report from page. */
router.get('/buttonsreport/:reportid/:pageid/', gradeButtons, function(req, res, next) {
  var reportid = req.params.reportid;
  var pageid = req.params.pageid;
  var buttonsgrade = req.buttonsgrade;
  var buttonswithgrades = req.buttonswithgrades;

  ButtonsTest.findOne({'siteID': reportid, '_id': pageid}, function (err, data) {
      if (err) {
          res.status(500).send(err)
      } else {
          res.render('../views/pages/buttons-test-report', { data, buttonsgrade, buttonswithgrades });
      }
  });

});

/* GET download pdf single-test-page-report. */
router.get('/savesitereport/:reportid/:pageid/:testid', function(req, res, next) {

  var reportid = req.params.reportid;
  var pageid = req.params.pageid;
  var testid = req.params.testid;

  phantom.create().then(function(ph) {
      ph.createPage().then(function(page) {
        //viewportSize being the actual size of the headless browser
        page.property("viewportSize", {width: 960, height: 1080});
        //the rest of the code is the same as the previous example
          page.open("http://localhost:3000/testrunner/report/"+reportid+'/'+pageid+'/'+testid).then(function(status) {
              page.render('./public/pdfreports/test_report_'+reportid+'_'+pageid+'_'+testid+'.pdf').then(function() {
                  console.log(reportid);
                  console.log('Single-test-page-reportPDF Rendered');
                  ph.exit();
                  res.download('./public/pdfreports/test_report_'+reportid+'_'+pageid+'_'+testid+'.pdf');
              });
          });
      });
  });

});

module.exports = router;
