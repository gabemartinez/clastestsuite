// var mongoose = require('mongoose');
// var mongoconnection = 'mongodb://clastest:blah33@ds143141.mlab.com:43141/clastestsuite';
// mongoose.connect(mongoconnection);
//
// var Unitname = require('../models/Unitname');

var osmosis = require('osmosis');

        //osmosis requests building data
        osmosis
        // .get('https://math.asu.edu/content/cryptology')
        .get('https://math.asu.edu/degrees')
        // .set({
        //     'pageTitle': 'title',
        //     'unitName': '.header__sitename > a',
        //     'unitNameAlt': 'div.header__sitename > span',
        //     'buttons': ['.btn'],
        //     'globalasulinks': ['#asu_universal_nav li > a']
        // })
        .set({
          'title': 'title',
          'unitname': '.header__sitename > a',
          'unitnamealt': 'div.header__sitename > span'
        })
        .set({
          'globalasulinks':
            {
              'text': 'a',
              'link': 'a@href'
            }
        })
        .delay(600)
        .data(function(ourData) {

            console.log(ourData);
            // var unitnametestdata = new Unitname({ title: ourData.title, unitname: ourData.unitname, unitnamealt: ourData.unitnamealt, globalasulinks: ourData.globalasulinks });
            // unitnametestdata.save(function (err) {
            //   if (err) {
            //     console.log(err);
            //   } else {
            //     console.log(unitnametestdata);
            //   }
            // });

        })
        //osmosis requests building data

      // .log(console.log)
      // .error(console.log)
      // .debug(console.log)
