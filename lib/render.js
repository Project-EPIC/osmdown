var marked   = require('marked')
parseContext = require('code-context')
var _        = require('lodash')

var osmviz   = require('./viz')

function render_md(markdownText){
	return marked(markdownText)
}


/*
This is a neat function that allows us to keep the scope so we can reference
variables, how cool!
*/
function __scope__() {
    var o = {
        '_': _,
        'osmdown': osmviz
    }
        // for each declaration, extract the var to the scope
    declarations.forEach(function(d) {
        o[d.name] = eval(d.name)
    })
    return o
}

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

	var html = '<html><head><title>Test</title><link rel="stylesheet" href="css/github-markdown.css"></head><body><article class="markdown-body">'

  function __render__(text, scope) {
      _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
      var compiled = _.template(text)
			//console.log(compiled)
      html += '\n' + marked(compiled(scope))
  }

  function __code__(code) {
      html += '\n' + '<pre>' + code + '</pre>'
  }

  function __scope__() {
      var o = {
          '_': _,
      }
          // for each declaration, extract the var to the scope
      declarations.forEach(function(d) {
          o[d.name] = eval(d.name)
      })
      return o
  }
			//
	    // // import viz methods to scope
	    // var viz = {}
	    // for (var p in _viz) {
	    //     eval('viz.' + p + ' = function(data, options){ html = html + \'\\n\' + _viz.' + p + '(data,options)}')
	    // }

	eval(script)
	return html += "</article></body></html>"
}
