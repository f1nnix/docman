(function() {
  var fs, mkdirSync, normalizeString, writeFile;

  fs = require('fs');


  /**
   * Escapes any sting to filesystem path-safe representation
   * @param  {string} str String to normalize
   * @return {string} Normalized string
   */

  normalizeString = exports.normalizeString = function(str) {
    return str.replace(/[^a-z0-9_\-]/gi, '_').toLowerCase();
  };


  /**
   * Safely cerates a directory
   * @param  {[type]} path directory absolute path
   */

  mkdirSync = exports.mkdirSync = function(path) {
    var e;
    try {
      return fs.mkdirSync(path);
    } catch (_error) {
      e = _error;
    }
  };


  /**
   * Writes a file with context
   * @param  {string} filename Path to file
   * @param  {string} data     [description]
   */

  writeFile = exports.writeFile = function(file, data) {
    return fs.writeFileSync(file, data, 'utf8');
  };

}).call(this);
