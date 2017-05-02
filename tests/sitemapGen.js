var SitemapGenerator = require('sitemap-generator');

// create generator
var generator = new SitemapGenerator('https://clas.asu.edu/');

// register event listeners
generator.on('done', function (sitemaps) {
  console.log(sitemaps); // => array of generated sitemaps
});

// start the crawler
generator.start();
