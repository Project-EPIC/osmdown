var fs = require('fs')

var jsonprotectify = function( file ){
  try {
    var filename = file.substring(file.lastIndexOf('/')+1, file.length)
    console.log("Making JSONP Version of " + filename)

    if (fs.existsSync(file+"p") ){
      console.log('File already exists, moving on...')
    }
    else{
      var contents = fs.readFileSync(file)
      var prepend = 'var ' + filename.substring(0, filename.indexOf('.json')) + ' = '

      fs.writeFileSync(file+'p', (prepend + contents))
    }
  }
  catch (e) {
    console.log(e)
    console.log("Uh oh, failed to create: "+file+"p")
  }
}

module.exports = jsonprotectify
