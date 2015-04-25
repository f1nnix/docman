(function() {
  var M, utils;

  utils = require('../utils.js');

  M = require('../marker.js');

  module.exports = function(parameter) {
    var data;
    data = '';
    data += '| ' + parameter.key + ' | ' + parameter.type + ' | ' + parameter.value + ' |';
    data += '\n';
    return data;
  };

}).call(this);
