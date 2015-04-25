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
  data +=  M.h3("#{request.method} #{request.name}\n\n")
  data += request.description + '\n\n'
  # process mets
  data += M.h4('Description') + '\n\n'
  data += getDescr(request)
  # process perameters
  paramHeader = if request.method is "GET" then "Query parameters (?:key=value)" else "Body parameters (urlencoded)"
  data += M.h4(paramHeader) + '\n\n'

  # get parameters values names (name, type, value...)
  params = getParametersNames(request.data)
  table  = createParamsTable(params, request.data)

  data += table

  data += '\n'
  data


getParametersNames = (data)->
  # TDOD: make actual params extracting
  [
    "key"
    "value"
    "type"
    "enabled"
  ]


createParamsTable = (paramNames, paramsObjects)->
  maxChars = {}
  table    = ""

  # determine the longest val for each col
  for paramName in paramNames
    maxChars[paramName] = paramName.length
    for paramsObject in paramsObjects
      if paramsObject[paramName].length > maxChars[paramName]
        maxChars[paramName] = paramsObject[paramName].length

    # console.log "Max length for #{paramName}: #{maxChars[paramName]}"

  # build table header
  table += "|"
  for paramName in paramNames
    # add whitespace for clear formatting
    if paramName.length < maxChars[paramName]
      remainingSpaces = maxChars[paramName] - paramName.length
      table += " #{paramName}" + Array(remainingSpaces+1).join(" ") + " "
    else
      table += " #{paramName} "

    table += "|"
  table += "\n"

  # add header divider
  table += "|"
  for paramName in paramNames
    whiteSpaces = maxChars[paramName] + 2
    table += Array(whiteSpaces+1).join("-") + "|"
  table += "\n"

  # build params rows
  for paramsObject in paramsObjects
    table += "|"
    for key of paramsObject
      value = String(paramsObject[key])
      # add whitespace for clear formatting
      if value.length < maxChars[key]
        remainingSpaces = maxChars[key] - value.length
        table += " #{value}" + Array(remainingSpaces+1).join(" ") + " "
      else
        table += " #{value} "
      table += "|"
    table += "\n"

  table
