(function () {
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

  buildToc = function (collection) {
    var data;
    data = '';
    if (collection.item) {
      collection.item.forEach(function (request) {
        return data += M.li(request.name) + '\n';
      });
    }
    data += '\n';
    return data;
  };

  module.exports = function (Postman, outputDir) {
    return Postman.item.forEach(function (collection) {
      var data;
      data = '';
      data += M.h1(collection.name) + '\n\n';
      data += collection.description + '\n\n';
      data += M.h4('Available methods') + '\n\n';
      data += buildToc(collection);
      if (collection.item) {
        collection.item.forEach(function (reqItm) {
          data += generators.request(reqItm);
        });
      }
      return utils.writeFile(outputDir + '/' + utils.normalizeString(collection.name) + '.md', data);
    });
  };

}).call(this);
