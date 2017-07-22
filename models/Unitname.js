var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var UnitNameSchema = new mongoose.Schema({
  title: String,
  unitname: String,
  unitnamealt: String,
  globalasulinks: [
    {
      text: String,
      link: String
    }
  ],
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Unitname', UnitNameSchema);
