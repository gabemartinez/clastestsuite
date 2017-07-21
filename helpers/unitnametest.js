var osmosis = require('osmosis');



        //osmosis requests building data
        osmosis
        .get('https://math.asu.edu/content/cryptology')
        .set({
            'pageTitle': 'title',
            'unitName': '.header__sitename > a',
            'unitNameAlt': 'div.header__sitename > span',
            'buttons': ['.btn'],
            'globalasulinks': ['#asu_universal_nav li > a']
        })
        .delay(200)
        .data(function(ourData) {

            console.log(ourData);

        })
        //osmosis requests building data

      // .log(console.log)
      // .error(console.log)
      // .debug(console.log)
