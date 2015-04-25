(function() {
  var M, createParamsTable, generators, getDescr, getParametersNames, utils;

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
    var data, paramHeader, params, table;
    data = '';
    data += M.h3(request.method + " " + request.name + "\n\n");
    data += request.description + '\n\n';
    data += M.h4('Description') + '\n\n';
    data += getDescr(request);
    paramHeader = request.method === "GET" ? "Query parameters (?:key=value)" : "Body parameters (urlencoded)";
    data += M.h4(paramHeader) + '\n\n';
    params = getParametersNames(request.data);
    table = createParamsTable(params, request.data);
    data += table;
    data += '\n';
    return data;
  };

  getParametersNames = function(data) {
    return ["key", "value", "type", "enabled"];
  };

  createParamsTable = function(paramNames, paramsObjects) {
    var i, j, k, key, l, len, len1, len2, len3, len4, m, maxChars, paramName, paramsObject, remainingSpaces, table, value, whiteSpaces;
    maxChars = {};
    table = "";
    for (i = 0, len = paramNames.length; i < len; i++) {
      paramName = paramNames[i];
      maxChars[paramName] = paramName.length;
      for (j = 0, len1 = paramsObjects.length; j < len1; j++) {
        paramsObject = paramsObjects[j];
        if (paramsObject[paramName].length > maxChars[paramName]) {
          maxChars[paramName] = paramsObject[paramName].length;
        }
      }
    }
    table += "|";
    for (k = 0, len2 = paramNames.length; k < len2; k++) {
      paramName = paramNames[k];
      if (paramName.length < maxChars[paramName]) {
        remainingSpaces = maxChars[paramName] - paramName.length;
        table += (" " + paramName) + Array(remainingSpaces + 1).join(" ") + " ";
      } else {
        table += " " + paramName + " ";
      }
      table += "|";
    }
    table += "\n";
    table += "|";
    for (l = 0, len3 = paramNames.length; l < len3; l++) {
      paramName = paramNames[l];
      whiteSpaces = maxChars[paramName] + 2;
      table += Array(whiteSpaces + 1).join("-") + "|";
    }
    table += "\n";
    for (m = 0, len4 = paramsObjects.length; m < len4; m++) {
      paramsObject = paramsObjects[m];
      table += "|";
      for (key in paramsObject) {
        value = String(paramsObject[key]);
        if (value.length < maxChars[key]) {
          remainingSpaces = maxChars[key] - value.length;
          table += (" " + value) + Array(remainingSpaces + 1).join(" ") + " ";
        } else {
          table += " " + value + " ";
        }
        table += "|";
      }
      table += "\n";
    }
    return table;
  };

}).call(this);
