(function () {
  var M, generateBodyParameters, generateExampleResponses, generateQueryParameters, generateURLParameters, generators, getDescr, url, utils;

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

  getDescr = function (request) {
    var data;
    data = '';
    data += M.li(M.strong('Method:') + ' ' + request.method) + '\n';

    if (request.url.raw) {
      data += M.li(M.strong('URL:') + ' ' + url.parse(request.url.raw).pathname) + '\n';
    } else {
      data += M.li(M.strong('URL:') + ' ' + url.parse(request.url).pathname) + '\n';
    }

    data += generateURLParameters(request);
    data += '\n';
    return data;
  };

  module.exports = function (reqItm) {
    var data;
    data = '';
    data += M.h2("[" + reqItm.request.method + "] " + reqItm.name + "\n\n");
    data += reqItm.request.description + '\n\n';
    data += M.h4('Description') + '\n\n';
    data += getDescr(reqItm.request);
    data += M.h4('Query parameters') + '\n\n';
    data += generateQueryParameters(reqItm.request);
    data += '\n';
    data += M.h4('Body payload') + '\n\n';
    data += generateBodyParameters(reqItm.request);
    data += '\n';
    data += M.h4('Example responses') + '\n\n';
    data += generateExampleResponses(reqItm.response);
    data += '\n';
    return data;
  };

  generateURLParameters = function (request) {
    var data, key;
    data = "";
    if (request.pathVariables && Object.keys(request.pathVariables).length !== 0) {
      for (key in request.pathVariables) {
        data += "    " + M.li(M.strong(key + ":") + " " + request.pathVariables[key]) + "\n";
      }
    } else {
      "";
    }
    return data;
  };

  generateQueryParameters = function (request) {
    var data, key, queryData, results, reqUrl;
    data = "";

    if (request.url.raw) {
      reqUrl = request.url.raw;
    } else {
      reqUrl = request.url;
    }

    queryData = url.parse(reqUrl, true).query;
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

  generateBodyParameters = function (request) {
    var data;
    data = "";

    if (request.data && request.data.length !== 0) {
      return data += M.table(request.data) + "\n";
    }
    else if (request.body) {
      data += "```json\n";
      data += JSON.stringify(request.body, null, 4) + "\n";
      data += "```\n";

      return data;
    }
    else {
      return "*No body parameters accepted.*\n";
    }
  };

  generateExampleResponses = function (responses) {
    var data, e, i, len, ref, response, responseJSON;
    if (responses) {
      if (responses.length > 0) {
        data = "";
        ref = responses;
        for (i = 0, len = ref.length; i < len; i++) {
          response = ref[i];
          data += M.h5(response.name) + "\n\n";
          try {

            if (response.body.raw) {
              responseJSON = JSON.parse(response.body.raw);
            }
            else {
              responseJSON = JSON.parse(response.body);
            }

            data += "```json\n";
            data += JSON.stringify(responseJSON, null, 4) + "\n";
            data += "```\n";
          } catch (_error) {
            e = _error;
            data += response.body + "\n\n";
          }
        }
        return data;
      }
    }
    return "*No example responses saved.*\n";
  };

}).call(this);
