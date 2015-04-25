utils      = require('../utils.js')
M          = require('../marker.js')

generators =
  request: require('./request.js')

###*
# Builds ToC based on collections requests
# @param  {obejct} collection JSON objects
# @return {string} String block with md-list
###

buildToc = (collection) ->
  data = ''

  collection.requests.forEach (request) ->
    data += M.li(request.name) + '\n'

  data += '\n'
  data

module.exports = (Postman, outputDir) ->
  Postman.collections.forEach (collection) ->
    data = ''
    data += M.h1(collection.name) + '\n\n'
    data += collection.description + '\n\n'
    data += M.h4('Available methods') + '\n\n'

    # build toc
    data += buildToc(collection)
    collection.requests.forEach (request) ->
      data += generators.request(request)
      return

    # write collection file
    utils.writeFile outputDir + '/' + utils.normalizeString(collection.name) + '.md', data
