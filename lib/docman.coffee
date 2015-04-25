M     = require('./marker.js')
utils = require('./utils.js')

generators =
  index       : require('./generators/index.js')
  collections : require('./generators/collections')

module.exports = (Postman, outputDir) ->
  utils.mkdirSync outputDir

  # start generating docs
  generators.index Postman, outputDir
  generators.collections Postman, outputDir
