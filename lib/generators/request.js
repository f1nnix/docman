(function() {
  var M, generators, getDescr, utils;

  utils = require('../utils.js');

  M = require('../marker.js');

  generators = {
    bodyParameter: require('./bodyparameter.js')

    /**
     * Return MD description for the request
     * @param  {Object} request Postman request objct
     * @return {string} MD list with description
     */
  };

  getDescr = function(request) {
    var data;
    data = '';
    data += M.li(M.strong('Method:') + ' ' + request.method) + '\n';
    data += M.li(M.strong('URL:') + ' ' + request.url) + '\n';
    data += '\n';
    return data;
  };

  module.exports = function(request) {
    var data, paramHeader;
    data = '';
    data += M.h2("[" + request.method + "] " + request.name + "\n\n");
    data += request.description + '\n\n';
    data += M.h4('Description') + '\n\n';
    data += getDescr(request);
    paramHeader = request.method === "GET" ? "Query parameters (?:key=value)" : "Body parameters (urlencoded)";
    data += M.h4(paramHeader) + '\n\n';
    if (request.data.length > 0) {
      data += M.table(request.data) + "\n";
    } else {
      switch (request.method) {
        case "GET":
          data += "Request does not accept any query parameters\n";
          break;
        case "POST":
          data += "Request does not accept any body parameters (urlencoded payload)\n";
      }
    }
    data += '\n';
    return data;
  };

}).call(this);
