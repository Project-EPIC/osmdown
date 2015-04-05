var fs = require('fs')
var Mustache = require('mustache')

module.exports = function(formatter_type, data){
  location = 'templates/_formatters/'
  return Mustache.render(fs.readFileSync(location + formatter_type + ".html", 'utf-8'),data)
}