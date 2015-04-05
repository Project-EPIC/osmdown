var fs = require('fs')

//A very lightweight JSON loading function with no error handling nor async.
var osmload = function( file, site_data ){

  //Extract the name of the JSON file from the data passed to it
  // file = d.value.substring(d.value.indexOf('(')+1, d.value.indexOf(')'))

  //Load the file as JSON:
  data = JSON.parse(fs.readFileSync(file))
  //
  return data
}

module.exports = osmload
