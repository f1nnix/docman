(function() {
  var M, generateBodyParameters, generateQueryParameters, generateURLParameters, generators, getDescr, url, utils;

  url = require('url');

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
    data += M.li(M.strong('URL:') + ' ' + url.parse(request.url).pathname) + '\n';
    data += generateURLParameters(request);
    data += '\n';
    return data;
  };

  module.exports = function(request) {
    var data;
    data = '';
    data += M.h2("[" + request.method + "] " + request.name + "\n\n");
    data += request.description + '\n\n';
    data += M.h4('Description') + '\n\n';
    data += getDescr(request);
    data += M.h4('Query parameters (?name=bob)') + '\n\n';
    data += generateQueryParameters(request);
    data += '\n';
    data += M.h4('Body parameters (form-data/urlencoded payload)') + '\n\n';
    data += generateBodyParameters(request);
    data += '\n';
    return data;
  };

  generateURLParameters = function(request) {
    var data, key;
    data = "";
    if (Object.keys(request.pathVariables).length !== 0) {
      for (key in request.pathVariables) {
        data += "    " + M.li(M.strong(key + ":") + " " + request.pathVariables[key]) + "\n";
      }
    } else {
      "";
    }
    return data;
  };

  generateQueryParameters = function(request) {
    var data, key, queryData, results;
    data = "";
    queryData = url.parse(request.url, true).query;
    if (Object.keys(queryData).length !== 0) {
      results = [];
      for (key in queryData) {
        results.push(data += M.li(M.strong(key + ":") + " " + queryData[key]) + "\n");
      }
      return results;
    } else {
      return "*No query parameters accepted.*\n";
    }
  };

  generateBodyParameters = function(request) {
    var data;
    data = "";
    if (request.data.length !== 0) {
      return data += M.table(request.data) + "\n";
    } else {
      return "*No body parameters (form-data/urlencoded payload) accepted.*\n";
    }
  };

}).call(this);
