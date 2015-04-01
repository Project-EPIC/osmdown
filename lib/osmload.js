var fs = require('fs')

//A very lightweight JSON loading function with no error handling nor async.
var osmload = function(path, data){

  //Extract the name of the JSON file from the data passed to it
  file = data.value.substring(data.value.indexOf('.')+1, data.value.indexOf(' '))

  //Load the file as JSON:
  data = JSON.parse(fs.readFileSync(path+"/json/"+file+".json"))

  return data
}

module.exports = osmload
