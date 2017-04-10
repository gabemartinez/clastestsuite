var request = require('request')
var cheerio = require('cheerio')
var Case = require('case')

var url = process.argv[2];

//testing url argument title casing
request(url, function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html)
    var unitTitle = $( "div.header__sitename > span" ).text();
    var thisCase = Case.of(unitTitle);
    //console.log(thisCase);
    if (thisCase == "title"){
      var pf = "PASS"
    } else {
      var pf = "FAIL"
    }
    //console.log(pf);
    process.stdout.write("Unit Name Text: " + unitTitle.trim() + " / Casing Style: " + thisCase + " / PASS-FAIL: " + pf + "\n");

  }
})
