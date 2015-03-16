var fs 		= require('fs')
var yaml 	= require('js-yaml')
var _ 		= require('lodash')

module.exports = function (src, options, callback){

	//This depends on having '---' surrounding the YAML frontmatter.
	var doc = _.compact(fs.readFileSync(src, 'utf-8').split("---"))

	var site        = yaml.safeLoad(doc[0])
	var content     = doc[1]
	var blocksToParse = _.compact(content.split('```'))

	site.blocks = []

	//Idea from VizDown
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
	return site
}
