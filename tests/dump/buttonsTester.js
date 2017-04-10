// is there buttons
// is the text in the buttons sentence cased

//var links = [];
//var casper = require('casper').create();

// function getLinks() {
// var links = document.querySelectorAll('.btn');
// return Array.prototype.map.call(links, function(e) {
// return e.getAttribute('href');
// });
// }

casper.options.clientScripts = ["/Users/gabrielmartinez/Desktop/Projects/nodeWork/clastestsuite/node_modules/jquery/dist/jquery.min.js"];

var url = casper.cli.get("url");
var Case = require('case');

casper.test.begin('Testing buttons for sentence casing.', 2, function suite(test) {


  casper.start(url, function () {

    test.assertHttpStatus(200, 'Page is up and running.');

    test.assertExists('.btn', 'Buttons found on page.');

    //test.assertElementCount('.btn', 8);

    this.echo(this.fetchText('.btn'));
    //this.echo(Case.of(this.fetchText('.btn')));
    this.repeat(3, function() {
      this.echo(this.fetchText('.btn'));
    });

    // test.assertEvalEquals(function () {
    //     return document.querySelectorAll('.btn')[0].getAttribute('src').toString();
    // }, 'sentence', 'medium.jpg found using 320x480 viewport.');

    // test.assertEvalEquals(function () {
    //   return jQuery.fn.jquery;
    // }, '3.2.1', 'jQuery 3.2.1 was found.');

    // var buttonCount = this.evaluate(function() {
    //   var buttons = $('.btn');
    //   return buttons.length;
    // });
    // this.echo("Buttons found: " + buttonCount);

    // var checkButtonCasing = this.evaluate(function() {
    //   $('.btn').each(function() {
    //     return 5+5;
    //   });
    // });
    // this.echo(checkButtonCasing);


  });

  casper.run(function () {
    test.done();
  });

});
