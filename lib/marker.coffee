###*
# Containter for all common Markdown tags generators
###

Markdown = generator:
  h1    : (text) -> "# #{text}"
  h2    : (text) -> "## #{text}"
  h3    : (text) -> "### #{text}"
  h4    : (text) -> "#### #{text}"
  h5    : (text) -> "##### #{text}"
  h6    : (text) -> "###### #{text}"
  li    : (text) -> "* #{text}"
  table : (rows) -> createTable(rows)
  a     : (text, url) -> "[#{text}](#{url})"
  strong: (text, url) -> "**#{text}**"



createTable = (rows)->
  # HACK: !! fixme
  if rows instanceof Array
    # form-data/unlencoded
    headers = getTableHeaderName(rows)
    table   = buildTable(headers, rows)
    table
  else
    # raw JSON string
    # predifined columns names
    headers    = ["key", "value"]
    JSONParams = undefined
    # rows = rows
    #   .replace("\n", "")
    #   .replace("\t", "")
    #   .replace('\"', '"')
    #
    # console.log rows
    try
      JSONParams = JSON.parse(rows)
      return """
      ```json
      #{JSON.stringify(JSONParams, null, 4)}
      ```
      """
    catch e
      """
      ```
      #{rows}
      ```
      """

    # rows = []
    # # HACK: quick hack to transform string into generator-readable format
    # for key of JSONParams
    #   row =
    #     "key": key
    #     "value"    : JSONParams[key]
    #   rows.push row
    #
    # table = buildTable(headers, rows)
    # table

getTableHeaderName = (data)->
  if data.length > 0
    headers = []
    for key of data[0]
      headers.push key
    headers
  else
    []


buildTable = (paramNames, paramsObjects)->
  maxChars = {}
  table    = ""

  # determine the longest val for each col
  for paramName in paramNames
    maxChars[paramName] = paramName.length
    for paramsObject in paramsObjects
      if paramsObject[paramName] isnt null # fix for null values
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

    # add \n to all rows except the last one
    if paramsObjects.indexOf(paramsObject) isnt paramsObjects.length - 1
      table += "\n"

  table

module.exports = Markdown.generator
