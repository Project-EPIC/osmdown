var fs = require('fs')
var Mustache = require('mustache')

module.exports = function(map_type, options){
  if (options == undefined){
    var options = {}
  }
  if (options.location == undefined){
    options.location = __dirname+'/../../templates/_maps/'
  }

  // Sensible Defaults
  options.name = options.name ? options.name : 'map'
  options.height = options.height ? options.height : '500px'
  options.width = options.width ? options.width : '100%'
  options.padding = options.padding ? options.padding : '50'
  options.maxzoom = options.maxzoom ? options.maxzoom : '18'
  options.id = options.id ? options.id : 'examples.map-i875mjb7'
  options.data = JSON.stringify(options.data)
  options.zoom = options.zoom ? options.zoom : ''

  return Mustache.render(fs.readFileSync(options.location + map_type + ".html", 'utf-8'),options)
}
