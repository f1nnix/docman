(function() {
  var M, utils;

  utils = require('../utils.js');

  M = require('../marker.js');

  module.exports = function(Postman, outputDir) {
    var data;
    data = M.h2('Collections') + '\n\n';
    Postman.collections.forEach(function(collection) {
      var name;
      name = collection.name;
      return data += M.li(M.a(name, "./" + (utils.normalizeString(name)) + ".md")) + '\n';
    });
    return utils.writeFile(outputDir + '/index.md', data);
  };

}).call(this);
