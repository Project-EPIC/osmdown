var fs = require('fs')

module.exports = function(block_type, options){

  if (options == undefined){options = {} }

  if (options.location ==undefined){ options.location = 'templates/_blocks/' }

  return fs.readFileSync(options.location + block_type + ".html", 'utf-8')

}
