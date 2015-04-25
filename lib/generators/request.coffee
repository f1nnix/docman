utils = require('../utils.js')
M = require('../marker.js')
generators = bodyParameter: require('./bodyparameter.js')

###*
# Return MD description for the request
# @param  {Object} request Postman request objct
# @return {string} MD list with description
###

getDescr = (request) ->
  data = ''
  data += M.li(M.strong('Method:') + ' ' + request.method) + '\n'
  data += M.li(M.strong('URL:') + ' ' + request.url) + '\n'
  data += '\n'
  data

module.exports = (request) ->
  data = ''
  data +=  M.h2("[#{request.method}] #{request.name}\n\n")
  data += request.description + '\n\n'
  # process mets
  data += M.h4('Description') + '\n\n'
  data += getDescr(request)
  # process perameters
  paramHeader = if request.method is "GET" then "Query parameters (?:key=value)" else "Body parameters (urlencoded)"
  data += M.h4(paramHeader) + '\n\n'

  if request.data.length > 0
    data += M.table(request.data) + "\n"
  else
    switch request.method
      when "GET"
        data += "Request does not accept any query parameters\n"
      when "POST"
        data += "Request does not accept any body parameters (urlencoded payload)\n"

  data += '\n'

  data
