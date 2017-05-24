var runall = function(req, res, next) {

  // var url = "http://clas.asu.edu";
  var url = req.body.page;

  req.tr1 = "blakkow";
  next();

};

module.exports = runall;
