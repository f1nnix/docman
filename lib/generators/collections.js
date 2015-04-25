(function() {
  var M, buildToc, generators, utils;

  utils = require('../utils.js');

  M = require('../marker.js');

  generators = {
    request: require('./request.js')
  };


  /**
   * Builds ToC based on collections requests
   * @param  {obejct} collection JSON objects
   * @return {string} String block with md-list
   */

  buildToc = function(collection) {
    var data;
    data = '';
    collection.requests.forEach(function(request) {
      return data += M.li(request.name) + '\n';
    });
    data += '\n';
    return data;
  };

  module.exports = function(Postman, outputDir) {
    return Postman.collections.forEach(function(collection) {
      var data;
      data = '';
      data += M.h1(collection.name) + '\n\n';
      data += collection.description + '\n\n';
      data += M.h4('Available methods') + '\n\n';
      data += buildToc(collection);
      collection.requests.forEach(function(request) {
        data += generators.request(request);
      });
      return utils.writeFile(outputDir + '/' + utils.normalizeString(collection.name) + '.md', data);
    });
  };

}).call(this);
