var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var ButtonsTestSchema = new mongoose.Schema({
  siteID: String,
  results: [
    {
      buttonText: String,
      passFail: String
    }
  ],
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ButtonsTest', ButtonsTestSchema);
