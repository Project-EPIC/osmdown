var marked   = require('marked')
parseContext = require('code-context')
var _        = require('lodash')

var osmviz   = require('./viz')
var osmdata  = require('./osmload')


function render_md(markdownText){
	return marked(markdownText)
}


/*
This is a neat function that allows us to keep the scope so we can reference
variables, how cool!
*/
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
	// console.log(script)
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

	//If data is inside the {{ }}, thne be sure that it's evaluated according to the scope
  function __render__(text, scope) {
      _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
      var compiled = _.template(text)
      html += '\n' + marked(compiled(scope))
  }

  function __code__(code) {
      html += '\n' + '<pre>' + code + '</pre>'
  }

  function __scope__() {
      var o = {
          '_': _,
					'osmviz'  : osmviz,
					'osmdata' : osmdata
      }

			// for each declaration, extract the var to the scope
      declarations.forEach(function(d) {
				//If calling osmdata, then call the loader for the JSON
				if (d.value.split('.')[0] == 'osmdata'){
					o[d.name] = osmdata(site_data.write_directory, d)
				}else{ o[d.name] = eval(d.name) }

      })

			// // import osmviz methods to scope
			// var viz = {}
			// for (var p in osmviz) {
			// 		eval('osmviz.' + p + ' = function(data, options){ html = html + \'\\n\' + _viz.' + p + '(data,options)}')
			// }
      return o
  }

	eval(script)
	return html + '</article>'
}
