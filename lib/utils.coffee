fs = require('fs')

###*
# Escapes any sting to filesystem path-safe representation
# @param  {string} str String to normalize
# @return {string} Normalized string
###

normalizeString = exports.normalizeString = (str) ->
  str
    .replace(/[^a-z0-9_\-]/gi, '_')
    .toLowerCase()


###*
# Safely cerates a directory
# @param  {[type]} path directory absolute path
###

mkdirSync = exports.mkdirSync = (path) ->
  try
    fs.mkdirSync path
  catch e
    # if (e.code != 'EEXIST') throw e;


###*
# Writes a file with context
# @param  {string} filename Path to file
# @param  {string} data     [description]
###

writeFile = exports.writeFile = (file, data) ->
  fs.writeFileSync file, data, 'utf8'
