var mongoose = require('mongoose');
var mongoconnection = 'mongodb://clastest:blah33@ds143141.mlab.com:43141/clastestsuite';
mongoose.connect(mongoconnection);

var Site = require('../models/Site');
var Test = require('../models/Test');

var osmosis = require('osmosis');

module.exports = function(siteid) {

  Site.findById(siteid, function(err, site) {

    if (err) {

      //found an error
      console.log(err);

    } if (site) {

      var urls = site.links;

      urls.forEach(function(element) {

        //osmosis requests building data
        osmosis
        .get(element)
        .set({
            'pageTitle': 'title',
            'unitName': 'div.header__sitename > span',
            'buttons': ['.btn'],
            'globalasulinks': ['#asu_universal_nav li > a']
        })
        .delay(200)
        .data(function(ourData) {
            // console.log(ourData);

            //
            var testButtonsData = new Test({ siteID: siteid, pageLink: element, results: ourData });
            testButtonsData.save(function (err) {
              if (err) {
                console.log(err);
              } else {
                // console.log(testButtonsData);
              }
            });
            //

        })
        //osmosis requests building data

      });

      // .log(console.log)
      // .error(console.log)
      // .debug(console.log)

    } else {

      console.log("No site found with that ID.");

    }

});

}
