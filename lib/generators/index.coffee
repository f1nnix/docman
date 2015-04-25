utils = require('../utils.js')
M     = require('../marker.js')

module.exports = (Postman, outputDir) ->
  data = M.h2('Collections') + '\n\n'

  Postman.collections.forEach (collection) ->
    name = collection.name
    data += M.li(M.a(name, "./#{utils.normalizeString(name)}.md")) + '\n'

  utils.writeFile outputDir + '/index.md', data
