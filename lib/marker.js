
/**
 * Containter for all common Markdown tags generators
 */

(function() {
  var Markdown, buildTable, createTable, getTableHeaderName;

  Markdown = {
    generator: {
      h1: function(text) {
        return "# " + text;
      },
      h2: function(text) {
        return "## " + text;
      },
      h3: function(text) {
        return "### " + text;
      },
      h4: function(text) {
        return "#### " + text;
      },
      h5: function(text) {
        return "##### " + text;
      },
      h6: function(text) {
        return "###### " + text;
      },
      li: function(text) {
        return "* " + text;
      },
      table: function(rows) {
        return createTable(rows);
      },
      a: function(text, url) {
        return "[" + text + "](" + url + ")";
      },
      strong: function(text, url) {
        return "**" + text + "**";
      }
    }
  };

  createTable = function(rows) {
    var JSONParams, e, headers, table;
    if (rows instanceof Array) {
      headers = getTableHeaderName(rows);
      table = buildTable(headers, rows);
      return table;
    } else {
      headers = ["key", "value"];
      JSONParams = void 0;
      try {
        JSONParams = JSON.parse(rows);
        return "```json\n" + (JSON.stringify(JSONParams, null, 4)) + "\n```";
      } catch (_error) {
        e = _error;
        return "```\n" + rows + "\n```";
      }
    }
  };

  getTableHeaderName = function(data) {
    var headers, key;
    if (data.length > 0) {
      headers = [];
      for (key in data[0]) {
        headers.push(key);
      }
      return headers;
    } else {
      return [];
    }
  };

  buildTable = function(paramNames, paramsObjects) {
    var i, j, k, key, l, len, len1, len2, len3, len4, m, maxChars, paramName, paramsObject, remainingSpaces, table, value, whiteSpaces;
    maxChars = {};
    table = "";
    for (i = 0, len = paramNames.length; i < len; i++) {
      paramName = paramNames[i];
      maxChars[paramName] = paramName.length;
      for (j = 0, len1 = paramsObjects.length; j < len1; j++) {
        paramsObject = paramsObjects[j];
        if (paramsObject[paramName] !== null) {
          if (paramsObject[paramName].length > maxChars[paramName]) {
            maxChars[paramName] = paramsObject[paramName].length;
          }
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
      if (paramsObjects.indexOf(paramsObject) !== paramsObjects.length - 1) {
        table += "\n";
      }
    }
    return table;
  };

  module.exports = Markdown.generator;

}).call(this);
