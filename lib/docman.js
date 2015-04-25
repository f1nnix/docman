(function() {
  var M, generators, utils;

  M = require('./marker.js');

  utils = require('./utils.js');

  generators = {
    index: require('./generators/index.js'),
    collections: require('./generators/collections')
  };

  module.exports = function(Postman, outputDir) {
    utils.mkdirSync(outputDir);
    generators.index(Postman, outputDir);
    return generators.collections(Postman, outputDir);
  };

}).call(this);
