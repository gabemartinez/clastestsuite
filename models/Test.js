var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var TestSchema = new mongoose.Schema({
  siteID: String,
  pageLink: String,
  results: [
    {
      pageTitle: String,
      unitName: String,
      buttons: [String],
      globalasulinks: [String]
    }
  ],
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Test', TestSchema);
