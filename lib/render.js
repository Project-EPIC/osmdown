var marked = require('marked')

function _render_md(markdownText){
	return marked(markdownText)
}

module.exports = function(data, callback){
	console.log(marked(data))
}