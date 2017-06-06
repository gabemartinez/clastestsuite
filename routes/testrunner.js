var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var pdf = require('html-pdf');

var mongoose = require('mongoose');
mongoose.connect('mongodb://clastest:blah33@ds143141.mlab.com:43141/clastestsuite');
var Site = require('../models/Site');

var websparkcheck = require('../middleware/websparkcheck');

var sitemap = require('../middleware/sitemap');

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

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
          res.render('../views/pages/single-report', { site });
      }
  });
});

/* GET page specific report. */
router.get('/report/:reportid/:pageid', function(req, res, next) {
  var reportid = req.params.reportid;
  var pageid = req.params.pageid;
  res.render('../views/pages/single-page-report', {reportid, pageid});
});

/* GET test specific report from page. */
router.get('/report/:reportid/:pageid/:testid', function(req, res, next) {
  var reportid = req.params.reportid;
  var pageid = req.params.pageid;
  var testid = req.params.testid;
  res.render('../views/pages/single-test-report', {reportid, pageid, testid});
});

router.get('/testing/pdf', (req, res) => {
  pdf.create(html).toStream((err, pdfStream) => {
    if (err) {
      // handle error and return a error response code
      console.log(err)
      return res.sendStatus(500)
    } else {
      // send a status code of 200 OK
      res.statusCode = 200

      // once we are done reading end the response
      pdfStream.on('end', () => {
        // done reading
        return res.end()
      })

      // pipe the contents of the PDF directly to the response
      pdfStream.pipe(res)
    }
  })
})

module.exports = router;
