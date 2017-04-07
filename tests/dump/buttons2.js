// casperjs test test/buttons2.js --url="https://clas.asu.edu/"


clientScripts: ["/Users/gabrielmartinez/Desktop/Projects/nodeWork/clastestsuite/node_modules/jquery/dist/jquery.min.js"]

casper.options.clientScripts.push("/Users/gabrielmartinez/Desktop/Projects/nodeWork/clastestsuite/node_modules/jquery/dist/jquery.min.js");


var url = casper.cli.get("url");
// or casper.cli.get(ARGNUMBER)
// var url = process.argv[3];

var Case = require('case');

casper.test.begin('Button sentence casing test.', 1, function(test) {

  casper.start(url, function() {

    clientScripts: ["/Users/gabrielmartinez/Desktop/Projects/nodeWork/clastestsuite/node_modules/jquery/dist/jquery.min.js"]

    casper.options.clientScripts.push("/Users/gabrielmartinez/Desktop/Projects/nodeWork/clastestsuite/node_modules/jquery/dist/jquery.min.js");

      this.echo(url + " is loaded.");
      test.assertExists('.btn');

      var btnCount = casper.getElementsInfo('.btn').length;
      this.echo("Total number of .btn elements: " + btnCount);

      casper.repeat(btnCount, function() {

        this.echo('-------------------------');

          // this.thenEvaluate(function(count) {
          //     nextPage(count);
          // }, ++count);
          //
          // this.then(function() {
          //     this.echo(this.getHTML());
          //     this.echo('-------------------------');
          // });

      });

        $('.btn').each(function (index, value) {
          this.echo($(this).text('.btn'));
        });

  });

  //test.assertExists('.btn');
  // var btnCount = casper.getElementsInfo('.btn').length;
  // this.echo("Total number of .btn elements: " + btnCount);

  // casper.then(function() {
  //     this.echo("I'm in your google.");
  // });
  //
  // casper.then(function() {
  //     this.echo('Now, let me write something');
  // });
  //
  // casper.then(function() {
  //     this.echo('Oh well.');
  // });

  casper.run();

});

// casper.test.begin('CTA buttons are sentence cased.', function(test) {
//
//     casper.start(url, function() {
//
//
//         test.assertExists('.btn');
//
//         var btnCount = casper.getElementsInfo('.btn').length;
//         this.echo("Total number of .btn elements: " + btnCount);
//
//     }).run(function() {
//         test.done();
//     });
//
// });


//casper.page.injectJs('../node_modules/jquery/dist/jquery.min.js');

// var buttonCheck = this.evaluate(function() {
//
//   $('.btn').each(function (index, value) {
//     this.echo($(this).text('.btn'));
//   });
//
//
//
// });

//this.echo(buttonCheck);

// var count = casper.evaluate(function(){ $('.btn').length;
// console.log(count); });

// var nameCount = this.evaluate(function() {
// var names = $('.blakkow')
// return names.length;
// });
// this.echo(nameCount);

// this.click('#dropdowns .nav-pills .dropdown:last-of-type a.dropdown-toggle');
// this.waitUntilVisible('#dropdowns .nav-pills .open', function() {
//     test.pass('Dropdown is open');
// });
