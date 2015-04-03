var marked   = require('marked')
parseContext = require('code-context')
var _        = require('lodash')

var osmviz   = require('./viz')
var osmdata  = require('./osmload')

//Creates a script from the blocks which is then evaluated
function _generate_script(blocks) {
	var script = ''
	blocks.forEach(function(block) {
		if (block.type === 'markdown') {
			script += '\n' + '__render__(' + JSON.stringify(block.content) + ', __scope__())'
		} else if (block.type === 'code') {
			script += '\n' + '__code__(' + JSON.stringify(block.content) + ')'
			script += '\n' + block.content
		}
	})
	return script
}

module.exports = function(site_data){

	blocks = site_data.blocks

	var script = _generate_script(blocks)
  var context = parseContext(script)
  var declarations = _.filter(context, {
      type: 'declaration'
  })

	var html = '<article class="markdown-body">'

	//If data is inside the {{ }}, then be sure that it's evaluated according to the scope
  function __render__(text, scope) {
      _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
      var compiled = _.template(text)(scope)

			//Check if already evaluated HTML
			if (_.trim(compiled.substring(0,20)).substring(0,4) == '<div'){
				html += compiled
			}
			//It's a normal markdown block, mark it
			else{
				html += '\n' + marked(compiled)
			}
  }

  function __code__(code) {
      html += '\n' + '<pre>' + code + '</pre>'
  }

  function __scope__() {
    var o = {
        '_': _,
				'osmviz'  : osmviz
    }

		// for each declaration, extract the var to the scope
    declarations.forEach(function(d) {
			console.log(d.value)
			//If calling osmdata, then call the loader for the JSON
			if (d.value.split('.')[0] == 'osmdata')
			{
				o[d.name] = osmdata(site_data.write_directory, d)
			}
			else{ o[d.name] = eval(d.name) }
    })

    return o
  }

	eval(script)
	return html + '</article>'
}
