var fs = require('fs')

var osmload = function(path, data){

  file = data.value.substring(data.value.indexOf('.')+1, data.value.indexOf(' '))

  //Status update
  console.log("Going to load the following JS: " + file)

  //Load it here

  data = JSON.parse(fs.readFileSync(path+"/json/"+file+".json"))

  return data
}

module.exports = osmload
