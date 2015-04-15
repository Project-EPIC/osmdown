var fs = require('fs')
var Mustache = require('mustache')

module.exports = function(block_type, options){
  if (options == undefined){
    var options = {}
  }
  if (options.location == undefined){
    options.location = __dirname+'/../../templates/_blocks/'
  }

  return Mustache.render(fs.readFileSync(options.location + block_type + ".html", 'utf-8'),options)
}
