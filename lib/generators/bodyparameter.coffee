utils = require('../utils.js')
M = require('../marker.js')

module.exports = (parameter) ->
  data = ''
  data += '| ' + parameter.key + ' | ' + parameter.type + ' | ' + parameter.value + ' |'
  data += '\n'
  data
