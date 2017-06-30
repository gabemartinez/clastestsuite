var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var phantom = require('phantom');

//--

var formatter = require("../helpers/formatString");

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//--

var mongoose = require('mongoose');
var mongoconnection = 'mongodb://clastest:blah33@ds143141.mlab.com:43141/clastestsuite';
mongoose.connect(mongoconnection);
var Site = require('../models/Site');

const Agenda = require('agenda');

//--

var websparkcheck = require('../middleware/websparkcheck');
var sitemap = require('../middleware/sitemap');
var buttons = require('../middleware/buttons');

//--

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
  var mongoConnectionString = mongoconnection;
  var agenda = new Agenda({db: {address: mongoConnectionString}});

  agenda.define('check buttons', function(job, done) {
    console.log('checking buttons...');
    // console.log(job);
    console.log(formatter(site));
  });

  agenda.define('check favicon', function(job, done) {
    console.log('checking favicon...');
    // console.log(job);
  });

  agenda.define('check global asu link', function(job, done) {
    console.log('checking global asu link...');
    // console.log(job);
  });

  agenda.define('check unitnames', function(job, done) {
    console.log('checking unitnames...');
    // console.log(job);
  });

  agenda.on('ready', function() {
    // agenda.now('check buttons');
    agenda.every('2 minutes', 'check buttons');
    agenda.now('check favicon');
    agenda.now('check global asu link');
    agenda.now('check unitnames');
    agenda.start();
  });
  // agenda process

  res.render('../views/pages/testrunner-started', { site, thisId: thisSite._id });
});

/* GET not testrunner page. */
router.get('/notwebspark', function(req, res, next) {
  var site = req.body.site;
  res.render('../views/pages/notwebspark', { site });
});

/* GET allreports page. */
router.get('/allreports', function(req, res, next) {
  // res.json('all reports');
  Site.find(function (err, sites) {
      if (err) {
          // Note that this error doesn't mean nothing was found,
          // it means the database had an error while searching, hence the 500 status
          res.status(500).send(err)
      } else {
          // send the list of all sites
          // res.json(sites);
          res.render('../views/pages/allreports', { sites });
      }
  });
});

/* GET report by id page. */
router.get('/report/:reportid', function(req, res, next) {
  var reportid = req.params.reportid;
  // res.json({reportid});
  Site.find({"_id": reportid}, function (err, site) {
      if (err) {
          res.status(500).send(err)
      } else {
          // send the list of all sites in database with get id
          // console.log(site);
          res.render('../views/pages/single-report', { site, reportid });
      }
  });
});

/* GET report by id page. */
router.get('/report-sortable/:reportid', function(req, res, next) {
  var reportid = req.params.reportid;
  // res.json({reportid});
  Site.find({"_id": reportid}, function (err, site) {
      if (err) {
          res.status(500).send(err)
      } else {
          // send the list of all sites in database with get id
          // console.log(site);
          res.render('../views/pages/single-report-sort', { site, reportid });
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
router.get('/report/:reportid/:pageid', function(req, res, next) {
  var reportid = req.params.reportid;
  var pageid = req.params.pageid;
  res.render('../views/pages/single-page-report', {reportid, pageid});
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

/* GET test specific report from page. */
router.get('/report/:reportid/:pageid/:testid', function(req, res, next) {
  var reportid = req.params.reportid;
  var pageid = req.params.pageid;
  var testid = req.params.testid;
  res.render('../views/pages/single-test-report', {reportid, pageid, testid});
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
