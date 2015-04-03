var fs = require('fs')
var Mustache = require('mustache')

module.exports = function(block_type, options){
  if (options == undefined){
    var options = {}
  }
  if (options.location == undefined){
    options.location = 'templates/_blocks/'
  }

  options.gotme = 'dynamic content!'

  return Mustache.render(fs.readFileSync(options.location + block_type + ".html", 'utf-8'),options)
}
