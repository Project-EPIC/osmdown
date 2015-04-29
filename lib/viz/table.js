var fs = require('fs')
var Mustache = require('mustache')

module.exports = function(table_type, data, options){
  if (options == undefined){
    var options = {}
  }
  options.limit = options.limit ? options.limit : data.length
  if (options.title != undefined){
    options.id = options.title
  }else{
    options.id = 'table_'+Math.random().toString().substring(5,10)
  }
  options.location = options.location ? options.location :  __dirname+'/../../templates/_tables/'

  var HTML = '<table id="'+options.id+'" class="dataTable">'

  if (options.headers != undefined){
    HTML += '<thead><tr>'
    options.headers.forEach(function(header){
      HTML+= '<th>' + header + '</th>'
    })
    HTML += '</tr></thead><tbody>'
  }

  for(var i=0; i<options.limit; i++){
    HTML+='<tr>'
    data[i].forEach(function(row){
      HTML+='<td>'+row+'</td>'
    })
    HTML+='</tr>'
  }
  HTML+= '</tbody></table>'

  options.table = HTML

  return Mustache.render(fs.readFileSync(options.location + table_type + ".html", 'utf-8'), options)

}
