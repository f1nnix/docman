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
  data += M.h4('Query parameters') + '\n\n'
  data += generateQueryParameters(request)
  data += '\n'

  # parse body perameters
  data += M.h4('Body parameters') + '\n\n'
  data += generateBodyParameters(request)
  data += '\n'

  # parse example responses
  data += M.h4('Example responses') + '\n\n'
  data += generateExampleResponses(request)
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
    "*No body parameters accepted.*\n"

generateExampleResponses = (request)->

  if request.responses
    if request.responses.length > 0
        data = ""
        for response in request.responses
          data += M.h5(response.name) + "\n\n"
          try
            responseJSON = JSON.parse(response.text)
            data += "```json\n"
            data += JSON.stringify(responseJSON, null, 4) + "\n"
            data += "```\n"
          catch e
            data += response.text + "\n\n"
        return data

  "*No example responses saved.*\n"
