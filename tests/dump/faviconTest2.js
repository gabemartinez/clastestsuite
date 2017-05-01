

  var imageDiff = require('image-diff');

  imageDiff({

    // actualImage: './tests/downloadedImages/favicon.ico',
    // expectedImage: './tests/baselineImages/favicon.ico',
    // diffImage: './tests/resultImages/favicon-difference.ico',

    actualImage: './tests/downloadedImages/apple-touch-icon.png',
    expectedImage: './tests/baselineImages/apple-touch-icon.png',
    diffImage: './tests/resultImages/apple-touch-icon-difference.png',

  }, function (err, imagesAreSame) {
    // error will be any errors that occurred
    // imagesAreSame is a boolean whether the images were the same or not
    // diffImage will have an image which highlights differences
    console.log(imagesAreSame);
  });
