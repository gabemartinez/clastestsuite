var x = require('casper').selectXPath;
casper.options.viewportSize = {width: 1829, height: 1074};
casper.on('page.error', function(msg, trace) {
   this.echo('Error: ' + msg, 'ERROR');
   for(var i=0; i<trace.length; i++) {
       var step = trace[i];
       this.echo('   ' + step.file + ' (line ' + step.line + ')', 'ERROR');
   }
});
casper.test.begin('Resurrectio test', function(test) {
   casper.start('https://clas.asu.edu/');
   casper.waitForSelector(x("//a[normalize-space(text())='Undergraduate programs']"),
       function success() {
           test.assertExists(x("//a[normalize-space(text())='Undergraduate programs']"));
           this.click(x("//a[normalize-space(text())='Undergraduate programs']"));
       },
       function fail() {
           test.assertExists(x("//a[normalize-space(text())='Undergraduate programs']"));
   });

   casper.run(function() {test.done();});
});
