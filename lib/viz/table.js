
module.exports = function(data, options){

  if (options.limit==undefined){ options.limit = data.length }

  var HTML = '<div class="osmviz table"><table>'

  if (options.headers != undefined){
    HTML += '<tr>'
    options.headers.forEach(function(header){
      HTML+= '<th>' + header + '</th>'
    })
    HTML += '</tr>'
  }

  for(var i=0; i<options.limit; i++){
    HTML+='<tr>'
    data[i].forEach(function(row){
      HTML+='<td>'+row+'</td>'
    })
    HTML+='</tr>'
  }
  HTML+= '</table></div>'

  return HTML
}
