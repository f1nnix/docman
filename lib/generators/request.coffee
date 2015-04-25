url = require 'url'

utils = require '../utils.js'
M     = require '../marker.js'

generators = bodyParameter:
  require('./bodyparameter.js')

###*
# Return MD description for the request
# @param  {Object} request Postman request objct
# @return {string} MD list with description
###

getDescr = (request) ->
  data = ''
  data += M.li(M.strong('Method:') + ' ' + request.method) + '\n'
  # remove query parameters from URL
  data += M.li(M.strong('URL:') + ' ' + url.parse(request.url).pathname) + '\n'
  # add URL params if they exist
  data += generateURLParameters(request)

  data += '\n'
  data

module.exports = (request) ->
  data = ''
  data +=  M.h2("[#{request.method}] #{request.name}\n\n")
  data += request.description + '\n\n'

  # process mets
  data += M.h4('Description') + '\n\n'
  data += getDescr(request)

  # parse query parameters
  data += M.h4('Query parameters (?name=bob)') + '\n\n'
  data += generateQueryParameters(request)
  data += '\n'

  # parse body perameters
  data += M.h4('Body parameters (form-data/urlencoded payload)') + '\n\n'
  data += generateBodyParameters(request)
  data += '\n'

  data


generateURLParameters = (request)->
  data = ""

  unless Object.keys(request.pathVariables).length is 0
    for key of request.pathVariables
      # make sub-list, shift for 4 spaces
      data += "    " + M.li(M.strong(key+":") + " " + request.pathVariables[key]) + "\n"
  else
    # dont add anything
    ""
  data

generateQueryParameters = (request)->
  data = ""
  queryData = url.parse(request.url, true).query;

  unless Object.keys(queryData).length is 0
    for key of queryData
      data += M.li(M.strong(key+":") + " " + queryData[key]) + "\n"
  else
    "*No query parameters accepted.*\n"

generateBodyParameters = (request)->
  data = ""

  unless request.data.length is 0
    data += M.table(request.data) + "\n"
  else
    "*No body parameters (form-data/urlencoded payload) accepted.*\n"
