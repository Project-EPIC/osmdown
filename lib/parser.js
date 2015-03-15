var fs = require('fs')
var yaml = require('js-yaml')

module.exports = function (src, options, callback){
	var doc = yaml.safeLoad(fs.readFileSync(src, 'utf-8'))
	console.log(doc)
}