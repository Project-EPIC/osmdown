var fs 		= require('fs')
var yaml 	= require('js-yaml')
var _ 		= require('lodash')

module.exports = function (src, options, callback){

	//This depends on having '---' surrounding the YAML frontmatter.
	var doc = _.compact(fs.readFileSync(src, 'utf-8').split("---"))

	var site        = yaml.safeLoad(doc[0])
	var content     = doc[1]

	//Next it finds the blocks of code as they are separated in markdown fashion
	var blocksToParse = _.compact(content.split('```'))

	site.blocks = []

	//Idea from VizDown -- Hope that code blocks and text alternate
	blocksToParse.forEach(function(data, index){
		block = {}

		if (index%2==1){
			block.type = 'code'
		}else{
			block.type = 'markdown'
		}
		block.content = data

		site.blocks.push(block)
	})

	//Returns a hash called 'site' with all of the blocks
	return site
}
